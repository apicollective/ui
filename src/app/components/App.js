import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import flatten from 'lodash/fp/flatten';
import sortBy from 'lodash/fp/sortBy';

import NavBar from '../../components/NavBar';
import SideBar from '../../components/SideBar';
import Content from '../../components/Content';
import { actions } from '../actions';
import { buildNavHref, cleanPath, getOperation, onClickHref } from '../../utils';

import styles from './app.css';

class App extends Component {

  getCurrentItem(params) {
    if (params.model) {
      return params.model;
    } else if (params.path) {
      return `${params.resource}${params.method}${params.path}`;
    }
    return null;
  }

  createResourceItem(params, resource, currentItem) {
    return {
      name: resource.type,
      items: resource.operations.map((operation) => (
        {
          name: `${operation.method} ${operation.path}`,
          onClick: onClickHref(buildNavHref({
            organization: params.organizationKey,
            application: params.applicationKey,
            resource: resource.type,
            method: operation.method.toLowerCase(),
            path: cleanPath(operation.path),
          })),
          active: currentItem === `${resource.type}${operation.method.toLowerCase()}${cleanPath(operation.path)}`,
          type: 'resource',
          method: operation.method,
          path: operation.path,
        }
      )),
    };
  }

  createModelItem(params, model, currentItem, type = 'model') {
    return {
      name: `${model.name}`,
      onClick: onClickHref(buildNavHref({
        organization: params.organizationKey,
        application: params.applicationKey,
        model: model.name,
      })),
      active: currentItem === model.name,
      type,
    };
  }


  createSideBarItems(params, spec, imports, organizations, organizationObj, applications) {
    if (!params.organizationKey) {
      const organizationsWithHref = organizations.map((organization) => (
        {
          name: organization.name,
          onClick: onClickHref(buildNavHref({
            organization: organization.key,
          })),
        }
      ));
      return [{
        name: '',
        items: [{
          name: 'Organizations',
          items: organizationsWithHref,
        }],
      }];
    } else if (params.organizationKey && !params.applicationKey) {
      const applicationsWithHref = applications.map((application) => (
        {
          name: application.name,
          onClick: onClickHref(buildNavHref({
            organization: params.organizationKey,
            application: application.key,
          })),
        }
      ));
      return [{
        name: '',
        items: [{
          name: organizationObj.name,
          items: applicationsWithHref,
        }],
      }];
    } else if (params.organizationKey && params.applicationKey && spec.apidoc) {
      const currentItem = this.getCurrentItem(params);
      const allResources = flatten(spec.resources.concat(imports.map((importValue) => importValue.resources)));
      const allModels = flatten(spec.models.concat(imports.map((importValue) => importValue.models)));
      const allEnums = flatten(spec.enums.concat(imports.map((importValue) => importValue.enums)));

      return [{
        name: 'Resources',
        items: allResources.map((resource) => (this.createResourceItem(params, resource, currentItem))),
      },
      {
        name: 'Models',
        items: [{
          name: '',
          items: allModels.map((model) => (this.createModelItem(params, model, currentItem)))
                          .concat(allEnums.map((enumValue) =>
                            (this.createModelItem(params, enumValue, currentItem, 'enum')))
                          ),
        }],
      }];
    }
    return [{ name: 'Unknown', items: [{ name: 'Unknown', items: [] }] }];
  }

  createNavBarItems(params, spec) {
    if (!spec.apidoc) {
      return [];
    }
    const operationPath = params.resource ? getOperation(params.resource, params.method, params.path, spec).path : null;
    return [].concat(
      params.organizationKey ? {
        name: params.organizationKey,
        onClick: onClickHref(buildNavHref({
          organization: params.organizationKey,
        })),
      } : [],
      params.applicationKey ? {
        name: params.applicationKey,
        onClick: onClickHref(buildNavHref({
          organization: params.organizationKey,
          application: params.applicationKey,
        })),
      } : [],
      params.resource ? {
        name: `${params.method.toUpperCase()} ${operationPath}`,
        onClick: onClickHref(buildNavHref({
          organization: params.organizationKey,
          application: params.applicationKey,
          resource: params.resource,
          method: params.method,
          path: params.path,
        })),
      } : [],
      params.model ? {
        name: `${params.model}`,
        onClick: onClickHref(buildNavHref({
          organization: params.organizationKey,
          application: params.applicationKey,
          model: params.model,
        })),
      } : []);
  }

  render() {
    const sideBarItems = this.createSideBarItems(
      this.props.params,
      this.props.spec,
      this.props.imports,
      this.props.organizations,
      this.props.organization,
      this.props.applications).map((sideBarItem) => {
        sideBarItem.items.map((items) => (
          Object.assign(items, { items: sortBy((item) => item.name, items.items) })
        ));
        return Object.assign(sideBarItem, { items: sortBy((item) => item.name, sideBarItem.items) });
      });

    const navBarItems = this.createNavBarItems(this.props.params, this.props.spec);
    return (
      <div>
        <NavBar items={navBarItems} homeOnClick={onClickHref('/')} />
        <div className={styles.main}>
          <SideBar sections={sideBarItems} />
          <Content>
            {this.props.children}
          </Content>
        </div>
      </div>);
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  spec: PropTypes.object.isRequired,
  organizations: PropTypes.array,
  organization: PropTypes.object,
  applications: PropTypes.array,
  params: PropTypes.object.isRequired,
  imports: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => (
  {
    spec: state.application.get('spec'),
    organizations: state.app.get('organizations'),
    organization: state.organization.get('organization'),
    applications: state.organization.get('applications'),
    imports: state.application.get('imports'),
  }
);

const mapDispatchToProps = (dispatch) => (
  { actions: bindActionCreators(actions, dispatch) }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

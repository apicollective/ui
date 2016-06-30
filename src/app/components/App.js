import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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

  createSideBarItems(params, spec, organizations, organizationObj, applications) {
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
      return [{
        name: 'Resources',
        items: spec.resources.map((resource) => (
          {
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
              }
            )),
          }
        )),
      },
      {
        name: 'Models',
        items: [{
          name: '',
          items: spec.models.map((model) => (
            {
              name: `${model.name}`,
              onClick: onClickHref(buildNavHref({
                organization: params.organizationKey,
                application: params.applicationKey,
                model: model.name,
              })),
              active: currentItem === model.name,
            }
        )).concat(
          spec.enums.map((enumValue) => (
            {
              name: `${enumValue.name}`,
              onClick: onClickHref(buildNavHref({
                organization: params.organizationKey,
                application: params.applicationKey,
                model: enumValue.name,
              })),
              active: currentItem === enumValue.name,
            }
        ))),
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
      this.props.organizations,
      this.props.organization,
      this.props.applications);
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
  spec: PropTypes.object,
  organizations: PropTypes.array,
  organization: PropTypes.object,
  applications: PropTypes.array,
  params: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => (
  {
    spec: state.application.get('spec'),
    organizations: state.app.get('organizations'),
    organization: state.organization.get('organization'),
    applications: state.organization.get('applications'),
  }
);

const mapDispatchToProps = (dispatch) => (
  { actions: bindActionCreators(actions, dispatch) }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

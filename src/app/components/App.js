// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import flatten from 'lodash/fp/flatten';
import sortBy from 'lodash/fp/sortBy';
import snakeCase from 'lodash/fp/snakeCase';

import NavBar from '../../components/NavBar';
import SideBar from '../../components/SideBar';
import Content from '../../components/Content';
import { actions } from '../actions';
import { buildNavHref, cleanPath, getOperation, onClickHref } from '../../utils';
import docs from '../../../documents.json';

import type { State } from '../../app/reducers';

import styles from './app.css';


/* type Item<T> = {
 *   name: string,
 *   items: T,
 * }*/
type Item = {
  name: string,
  active?: boolean,
  type?: string,
  /* onClick?: (href: string) => (event: Event) => void,*/
  onClick?: Function, // FIXME - use proper type
  items?: Item[],
}

class App extends Component {

  // FIXME add props

  // FIXME nullable?
  getCurrentItem(params): ?string {
    if (params.model) {
      return params.model;
    } else if (params.path) {
      return `${params.resource}${params.method}${params.path}`;
    }
    return null;
  }

  createResourceItem(params, resource, currentItem): Item {
    return {
      name: resource.type,
      items: resource.operations.map(operation => (
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

  createModelItem(params, model, currentItem, type = 'model'): Item {
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


  createSideBarItems(params, service, imports, organizations, organizationObj, applications): Item[] {
    if (!params.organizationKey) {
      const organizationsWithHref = organizations.map(organization => (
        {
          name: organization.name,
          onClick: onClickHref(buildNavHref({
            organization: organization.key,
          })),
        }
      ));
      return [{
        name: 'Organizations',
        items: [{
          name: '',
          items: organizationsWithHref,
        }],
      }];
    } else if (params.organizationKey && !params.applicationKey) {
      const applicationsWithHref = applications.map(application => (
        {
          name: application.name,
          onClick: onClickHref(buildNavHref({
            organization: params.organizationKey,
            application: application.key,
          })),
        }
      ));
      const orgDocsList = docs.organizations[params.organizationKey];
      const docsByOrg = (orgDocsList && orgDocsList.documents) || [];
      const docsWithHref = docsByOrg.map(doc => (
        {
          name: doc.name,
          onClick: onClickHref(buildNavHref({
            organization: params.organizationKey,
            documentation: snakeCase(doc.name),
          })),
        }
      ));
      const applicationSidebarGroup = [{
        name: 'Applications',
        items: [{
          name: '',
          items: applicationsWithHref,
        }],
      }];
      return applicationSidebarGroup.concat(docsWithHref.length
        ? [{
          name: 'Documentation',
          items: [{
            name: '',
            items: docsWithHref,
          }],
        }]
       : []);
    } else if (params.organizationKey && params.applicationKey && service.apidoc) {
      const currentItem = this.getCurrentItem(params);
      const allResources = service.resources;
      // FIXME - add back imports
      /* const allModels = flatten(service.models.concat(imports.map(importValue => importValue.models)));*/
      const allModels = service.models;
      // FIXME - add back enums
      /* const allEnums = flatten(service.enums.concat(imports.map(importValue => importValue.enums)));*/
      const allEnums = service.emums || [];

      return [{
        name: 'Resources',
        items: allResources.map(resource => (this.createResourceItem(params, resource, currentItem))),
      },
      {
        name: 'Models',
        items: [{
          name: '',
          items: allModels.map(model => (this.createModelItem(params, model, currentItem)))
                          .concat(allEnums.map(enumValue =>
                            (this.createModelItem(params, enumValue, currentItem, 'enum')))
                          ),
        }],
      }];
    }
    return [{ name: 'Unknown', items: [{ name: 'Unknown', items: [] }] }];
  }

  createNavBarItems(params, service): Item[] {
    // FIXME test
    if (!service.apidoc) {
      return [];
    }
    // FIXME test
    let operationPath = '';
    if(params.resource) {
      const op = getOperation(params.resource, params.method, params.path, service);
      operationPath = op ? op.path : '';
    }

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
    const {
      params,
      service,
      imports,
      organizations,
      organization,
      applications,
      children,
    } = this.props;

    const sideBarItems = this.createSideBarItems(params, service, imports, organizations, organization, applications)
      .map((sideBarItem) => {
        if (sideBarItem.items) {
          sideBarItem.items.map(items => (
            Object.assign(items, { items: sortBy(item => item.name, items.items) })
          ));
        }
        return Object.assign(sideBarItem, { items: sortBy(item => item.name, sideBarItem.items) });
      });

    const navBarItems = this.createNavBarItems(params, service);

    return (
      <div>
        <NavBar items={navBarItems} homeOnClick={onClickHref('/')} />
        <div className={styles.main}>
          <SideBar sections={sideBarItems} />
          <Content>
            {children}
          </Content>
        </div>
      </div>
    );
  }
}

// FIXME - replace with flow
App.propTypes = {
  children: PropTypes.object.isRequired,
  service: PropTypes.object.isRequired,
  organizations: PropTypes.array,
  organization: PropTypes.object,
  applications: PropTypes.array,
  params: PropTypes.object.isRequired,
  imports: PropTypes.array.isRequired,
};

const mapStateToProps = (state: State) => (
  {
    service: state.application.service,
    organizations: state.app.organizations,
    organization: state.organization.organization,
    applications: state.organization.applications,
    imports: state.application.imports,
  }
);

// FIXME type for dispatch
const mapDispatchToProps = dispatch => (
  { actions: bindActionCreators(actions, dispatch) }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

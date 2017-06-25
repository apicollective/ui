// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import sortBy from 'lodash/fp/sortBy';
import snakeCase from 'lodash/fp/snakeCase';

import NavBar from 'components/NavBar';
import SideBar from 'components/SideBar';
import Content from 'components/Content';
import { actions } from 'app/actions';
import * as utils from 'utils';

import type {
  Application,
  Organization,
  Service,
  Resource,
} from 'generated/version/ServiceType';
import type { State } from 'app/reducers';

import styles from 'app/components/app.css';
import docs from '../../../documents.json';

type Item = {
  name: string,
  active?: boolean,
  type?: string,
  onClick?: (event: Event) => void,
  items?: Item[],
};

type Props = {|
  children: React$Element<*>,
  service: Service,
  organizations: Organization[],
  organization: Organization,
  applications: Application[],
  params: Object, // FIXME
  importedServices: Service[],
|};

class App extends Component {
  props: Props;

  // FIXME nullable? + types
  static getCurrentItem(params: Object): ?string {
    if (params.model) {
      return params.model;
    } else if (params.path) {
      return `${params.resource}${params.method}${params.path}`;
    }
    return null;
  }

  static createResourceItem(
    params: Object,
    resource: Resource,
    currentItem: string
  ): Item {
    return {
      name: resource.type,
      items: resource.operations.map(operation => ({
        name: `${operation.method} ${operation.path}`,
        onClick: utils.onClickHref(
          utils.buildNavHref({
            organization: params.organizationKey,
            application: params.applicationKey,
            resource: resource.type,
            method: operation.method.toLowerCase(),
            path: utils.cleanPath(operation.path),
          })
        ),
        active:
          currentItem ===
            `${resource.type}${operation.method.toLowerCase()}${utils.cleanPath(
              operation.path
            )}`,
        type: 'resource',
        method: operation.method,
        path: operation.path,
      })),
    };
  }

  // FIXME types
  static createModelItem(
    params: Object,
    model: Object,
    currentItem: string,
    type: string = 'model'
  ): Item {
    return {
      name: `${model.name}`,
      onClick: utils.onClickHref(
        utils.buildNavHref({
          organization: params.organizationKey,
          application: params.applicationKey,
          model: model.name,
        })
      ),
      active: currentItem === model.name,
      type,
    };
  }

  // FIXME types
  static createSideBarItems(
    params: Object,
    service: Service,
    importedServices: Service[],
    organizations: Organization[],
    organizationObj: Organization,
    applications: Application[]
  ): Item[] {
    if (!params.organizationKey) {
      const organizationsWithHref = organizations.map(organization => ({
        name: organization.name,
        onClick: utils.onClickHref(
          utils.buildNavHref({
            organization: organization.key,
          })
        ),
      }));
      return [
        {
          name: 'Organizations',
          items: [
            {
              name: '',
              items: organizationsWithHref,
            },
          ],
        },
      ];
    } else if (params.organizationKey && !params.applicationKey) {
      const applicationsWithHref = applications.map(application => ({
        name: application.name,
        onClick: utils.onClickHref(
          utils.buildNavHref({
            organization: params.organizationKey,
            application: application.key,
          })
        ),
      }));
      const orgDocsList = docs.organizations[params.organizationKey];
      const docsByOrg = (orgDocsList && orgDocsList.documents) || [];
      const docsWithHref = docsByOrg.map(doc => ({
        name: doc.name,
        onClick: utils.onClickHref(
          utils.buildNavHref({
            organization: params.organizationKey,
            documentation: snakeCase(doc.name),
          })
        ),
      }));
      const applicationSidebarGroup = [
        {
          name: 'Applications',
          items: [
            {
              name: '',
              items: applicationsWithHref,
            },
          ],
        },
      ];
      return applicationSidebarGroup.concat(
        docsWithHref.length
          ? [
              {
                name: 'Documentation',
                items: [
                  {
                    name: '',
                    items: docsWithHref,
                  },
                ],
              },
            ]
          : []
      );
    } else if (
      params.organizationKey &&
      params.applicationKey &&
      service &&
      service.apidoc
    ) {
      const currentItem = App.getCurrentItem(params) || ''; // FIXME shouldn't be empty
      const allResources = service.resources;
      // FIXME - add back imports
      /* const allModels = flatten(service.models.concat(imports.map(importValue => importValue.models)));*/
      const allModels = service.models;
      // FIXME - add back enums
      /* const allEnums = flatten(service.enums.concat(imports.map(importValue => importValue.enums)));*/
      const allEnums = service.enums || [];

      return [
        {
          name: 'Resources',
          items: allResources.map(resource =>
            App.createResourceItem(params, resource, currentItem)
          ),
        },
        {
          name: 'Models',
          items: [
            {
              name: '',
              items: allModels
                .map(model => App.createModelItem(params, model, currentItem))
                .concat(
                  allEnums.map(enumValue =>
                    App.createModelItem(params, enumValue, currentItem, 'enum')
                  )
                ),
            },
          ],
        },
      ];
    }
    return [{ name: 'Unknown', items: [{ name: 'Unknown', items: [] }] }];
  }

  // FIXME types
  static createNavBarItems(params: Object, service: Service): Item[] {
    // FIXME test
    if (!service || !service.apidoc) {
      return [];
    }
    // FIXME test
    let operationPath = '';
    if (params.resource) {
      const op = utils.getOperation(
        params.resource,
        params.method,
        params.path,
        service
      );
      operationPath = op.path;
    }

    return [].concat(
      params.organizationKey
        ? {
            name: params.organizationKey,
            onClick: utils.onClickHref(
              utils.buildNavHref({
                organization: params.organizationKey,
              })
            ),
          }
        : [],
      params.applicationKey
        ? {
            name: params.applicationKey,
            onClick: utils.onClickHref(
              utils.buildNavHref({
                organization: params.organizationKey,
                application: params.applicationKey,
              })
            ),
          }
        : [],
      params.resource
        ? {
            name: `${params.method.toUpperCase()} ${operationPath}`,
            onClick: utils.onClickHref(
              utils.buildNavHref({
                organization: params.organizationKey,
                application: params.applicationKey,
                resource: params.resource,
                method: params.method,
                path: params.path,
              })
            ),
          }
        : [],
      params.model
        ? {
            name: `${params.model}`,
            onClick: utils.onClickHref(
              utils.buildNavHref({
                organization: params.organizationKey,
                application: params.applicationKey,
                model: params.model,
              })
            ),
          }
        : []
    );
  }

  render() {
    const {
      params,
      service,
      importedServices,
      organizations,
      organization,
      applications,
      children,
    } = this.props;

    const title = process.env.TITLE ? process.env.TITLE : 'API Builder';
    let removeGithubLink = true;
    if (typeof process.env.TITLE === 'undefined' || !process.env.TITLE) {
      removeGithubLink = false;
    }

    const sideBarItems = App.createSideBarItems(
      params,
      service,
      importedServices,
      organizations,
      organization,
      applications
    ).map(sideBarItem => {
      if (sideBarItem.items) {
        sideBarItem.items.map(items =>
          Object.assign(items, {
            items: sortBy(item => item.name, items.items),
          })
        );
      }
      return Object.assign(sideBarItem, {
        items: sortBy(item => item.name, sideBarItem.items),
      });
    });

    const navBarItems = App.createNavBarItems(params, service);

    return (
      <div>
        <NavBar
          title={title}
          items={navBarItems}
          homeOnClick={utils.onClickHref('/')}
          removeGithubLink={removeGithubLink}
        />
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

const mapStateToProps = (state: State) => ({
  service: state.application.service,
  organizations: state.app.organizations,
  organization: state.organization.organization,
  applications: state.organization.applications,
  importedServices: state.application.importedServices,
});

// FIXME type for dispatch
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

// @flow
import React from 'react';
import SideBarContents from 'components/SideBar/SideBarContents';
import { Route, Switch } from 'react-router-dom';
import snakeCase from 'lodash/fp/snakeCase';
import { connect } from 'react-redux';
import * as utils from 'utils';
import { ConnectedRouter } from 'react-router-redux';

import type {
  Application,
  Organization,
  Service,
  Model,
  Enum,
  Resource,
} from 'generated/version/ServiceType';
import type { ParamsApp, ParamsResource, ParamsModel, Props } from 'params';
import type { NavItem } from 'nav/NavItem';
import type { State } from 'app/reducers';

// FIXME typing https://github.com/facebook/flow/issues/620
import docs from '../../../documents.json';

const getItems = (props: Props): NavItem[] => {
  if (!props.match) {
    // PropsHome
    return homeItems(props.organizations);
  }
  if (props.match && props.match.organizationKey) {
    if (props.match.applicationKey && props.service) {
      // PropsApp
      return applicationItems(
        props.match.params,
        props.service,
        props.match.url
      );
    } else if (props.applications) {
      // PropsOrg
      return orgItems(
        props.match.organizationKey,
        props.applications,
        docsForOrg(props.match.organizationKey, docs)
      );
    }
  }
  return [];
};

const homeItems = (organizations: Organization[]): NavItem[] => {
  const organizationsWithHref = organizations.map(organization => ({
    name: organization.name,
    toHref: utils.buildNavHref({
      organization: organization.key,
    }),
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
};

const docsForOrg = (orgKey: string, documents: Object): Object[] => {
  const orgDocsList = documents.organizations[orgKey];
  const docsByOrg = (orgDocsList && orgDocsList.documents) || [];
  return docsByOrg;
};

const orgItems = (
  organizationKey,
  applications: Application[],
  documents: Object[]
): NavItem[] => {
  const applicationsWithHref = applications.map(application => ({
    name: application.name,
    toHref: utils.buildNavHref({
      organization: organizationKey,
      application: application.key,
    }),
  }));
  const docsWithHref = documents.map(doc => ({
    name: doc.name,
    toHref: utils.buildNavHref({
      organization: organizationKey,
      documentation: snakeCase(doc.name),
    }),
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
};

const applicationItems = (
  params: ParamsApp | ParamsResource | ParamsModel,
  service: Service,
  url: string
): NavItem[] => {
  /* const currentItem = getCurrentItem(params);*/
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
        createResourceItem(params, resource, url)
      ),
    },
    {
      name: 'Models',
      items: [
        {
          name: '',
          items: allModels
            .map(model => createModelItem(params, model, url, 'model'))
            .concat(
              allEnums.map(enumValue =>
                createModelItem(params, enumValue, url, 'enum')
              )
            ),
        },
      ],
    },
  ];
};

const createModelItem = (
  params: ParamsApp | ParamsResource | ParamsModel,
  model: Model | Enum,
  url: string,
  type: string
): NavItem => {
  const href = utils.buildNavHref({
    organization: params.organizationKey,
    application: params.applicationKey,
    model: model.name,
  });
  return {
    name: `${model.name}`,
    toHref: href,
    active: url === href,
    type,
  };
};

const createResourceItem = (
  params: ParamsApp | ParamsResource | ParamsModel,
  resource: Resource,
  url: string
): NavItem => ({
  name: resource.type,
  items: resource.operations.map(operation => {
    const href = utils.buildNavHref({
      organization: params.organizationKey,
      application: params.applicationKey,
      resource: resource.type,
      method: operation.method.toLowerCase(),
      path: utils.cleanPath(operation.path),
    });
    return {
      name: `${operation.method} ${operation.path}`,
      toHref: href,
      active: url === href,
      type: 'resource',
      method: operation.method,
      path: operation.path,
    };
  }),
});

const SideBar = () => (
  <Switch>
    <Route
      path="/org/:organizationKey/app/:applicationKey/r/:resource/m/:method/p/:path"
      component={SideBarContents}
    />
    <Route
      path="/org/:organizationKey/app/:applicationKey/m/:model"
      component={SideBarContents}
    />
    <Route
      path="/org/:organizationKey/app/:applicationKey"
      component={SideBarContents}
    />
    {/* <Route
    path="/org/:organizationKey/doc/:documentationKey"
    component={Documentation}
    /> */}
    <Route path="/org/:organizationKey" component={SideBarContents} />
    <Route component={SideBarContents} />
  </Switch>
);

export default SideBar;

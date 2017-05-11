// @flow
import React from 'react';
import { connect } from 'react-redux';
import NavBarContents from 'components/NavBar/NavBarContents';
import * as utils from 'utils';

import type { Props } from 'params';
import type { NavItem } from 'nav/NavItem';
import type { State } from 'app/reducers';

const NavBar = (props: Props) => {
  const title = process.env.TITLE ? process.env.TITLE : 'apidoc';
  let removeGithubLink = true;
  if (typeof process.env.TITLE === 'undefined' || !process.env.TITLE) {
    removeGithubLink = false;
  }
  return (
    <NavBarContents
      title={title}
      items={getItems(props)}
      toHref={'/'}
      removeGithubLink={removeGithubLink}
    />
  );
};

const getItems = (props: Props): NavItem[] => {
  // FIXME test
  if (!props.match || !props.service || !props.service.apidoc) {
    return [];
  }
  // FIXME test
  let operationPath = '';
  const params = props.match.params;
  if (params.resource) {
    const op = utils.getOperation(
      params.resource,
      params.method,
      params.path,
      props.service
    );
    operationPath = op.path;
  }

  return [].concat(
    params.organizationKey
      ? {
          name: params.organizationKey,
          toHref: utils.buildNavHref({
            organization: params.organizationKey,
          }),
        }
      : [],
    params.applicationKey
      ? {
          name: params.applicationKey,
          toHref: utils.buildNavHref({
            organization: params.organizationKey,
            application: params.applicationKey,
          }),
        }
      : [],
    params.resource
      ? {
          name: `${params.method.toUpperCase()} ${operationPath}`,
          toHref: utils.buildNavHref({
            organization: params.organizationKey,
            application: params.applicationKey,
            resource: params.resource,
            method: params.method,
            path: params.path,
          }),
        }
      : [],
    params.model
      ? {
          name: `${params.model}`,
          toHref: utils.buildNavHref({
            organization: params.organizationKey,
            application: params.applicationKey,
            model: params.model,
          }),
        }
      : []
  );
};

const mapStateToProps = (state: State) => ({
  service: state.application.service,
});

export default connect(mapStateToProps)(NavBar);

// @flow
import React from 'react';
import { Link } from 'utils';
import { connect } from 'react-redux';

import Button from 'components/Button';
import styles from 'components/NavBar/navbar.css';
import * as utils from 'utils';

import type { NavItem } from 'nav/NavItem';
import type { Props } from 'params';
import type { State } from 'app/reducers';

const NavBarContents = (props: Props) => {
  const title = process.env.TITLE ? process.env.TITLE : 'apidoc';
  let removeGithubLink = true;
  if (typeof process.env.TITLE === 'undefined' || !process.env.TITLE) {
    removeGithubLink = false;
  }
  const items = getItems(props);
  return (
    <div className={styles.navbar}>
      <Link className={styles.home} to={'/'}>{title}</Link>
      <div className={styles.breadcrumbs}>
        {items.map(
          (item, id) =>
            item.toHref
              ? <Button key={id} className={styles.button} toHref={item.toHref}>
                  {item.name}
                </Button>
              : <div />
        )}
      </div>
      {removeGithubLink ? null : githubLoginLink()}
      {removeGithubLink ? null : githubLink()}
    </div>
  );
};

const githubLoginLink = () => {
  if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_REDIRECT_URL) {
    const clientId = process.env.GITHUB_CLIENT_ID;
    const redirectUrl = process.env.GITHUB_REDIRECT_URL;
    const base = 'http://github.com/login/oauth/authorize';
    const scope = 'user:email';

    const url = encodeURI(
      `${base}?client_id=${clientId}&scope=${scope}&redirect_url=${redirectUrl}`
    );

    return <Link to={url}>Login/Register</Link>;
  } else {
    return <div />;
  }
};

const githubLink = () =>
  <a
    href="https://github.com/movio/apidoc-ui"
    className="githubCorner"
    aria-label="View source on Github"
  >
    <svg
      width="80"
      height="80"
      viewBox="0 0 250 250"
      aria-hidden={true}
      className={styles.githubSvg}
    >
      <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
      <path
        d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
        fill="currentColor"
        className="octoArm"
      />
      <path
        d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
        fill="currentColor"
        className="octoBody"
      />
    </svg>
  </a>;

const getItems = (props: Props): NavItem[] => {
  // FIXME test
  if (!props.match || !props.match.params) {
    return [];
  }
  // FIXME test
  let operationPath = '';
  const params = props.match.params;
  if (params.resource && props.service) {
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

export default connect(mapStateToProps)(NavBarContents);

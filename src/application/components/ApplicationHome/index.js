import React, { PropTypes } from 'react';

import { onClickHref, cleanPath } from '../../../utils';

import H1 from '../../../components/H1';
import Markdown from '../../../components/Markdown';
import ResourceCard from '../../components/ResourceCard';

import styles from './application-home.css';

const ApplicationHome = ({ spec, organizationKey, applicationKey }) => {
  const buildClickHref = (type, method, path) =>
    `/org/${organizationKey}/app/${applicationKey}/r/${type}/m/${method.toLowerCase()}/p/${cleanPath(path)}`;

  return (
    <div>
      <div className={styles.header}>
        <H1 className={styles.h1}>{spec.name}</H1>
        <Markdown source={spec.description ? spec.description : ''} className={styles.description} />
      </div>
      <div>
        {spec.resources.map(resource => (
          resource.operations.map(operation =>
            <ResourceCard
              key={operation.method + operation.path}
              method={operation.method}
              path={operation.path}
              click={onClickHref(buildClickHref(resource.type, operation.method, operation.path))}
            />
          )
        ))
        }
      </div>
    </div>
  );
};

ApplicationHome.propTypes = {
  spec: PropTypes.object.isRequired,
  organizationKey: PropTypes.string.isRequired,
  applicationKey: PropTypes.string.isRequired,
};

export default ApplicationHome;

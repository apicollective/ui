import React, { PropTypes } from 'react';

import { onClickHref, cleanPath } from '../../../utils';

import H1 from '../../../components/H1';
import Markdown from '../../../components/Markdown';
import ResourceCard from '../../components/ResourceCard';

import styles from './application-home.css';

const ApplicationHome = ({ service, organizationKey, applicationKey }) => {
  const buildClickHref = (type, method, path) =>
    `/org/${organizationKey}/app/${applicationKey}/r/${type}/m/${method.toLowerCase()}/p/${cleanPath(path)}`;

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <H1 className={styles.h1}>{service.name}</H1>
        <Markdown source={service.description ? service.description : ''} className={styles.description} />
      </div>
      <div>
        {service.resources.map(resource => (
          resource.operations.map(operation =>
            <ResourceCard
              key={operation.method + operation.path}
              method={operation.method}
              path={operation.path}
              click={onClickHref(buildClickHref(resource.type, operation.method, operation.path))}
              description={operation.description}
            />
          )
        ))
        }
      </div>
    </div>
  );
};

ApplicationHome.propTypes = {
  service: PropTypes.object.isRequired,
  organizationKey: PropTypes.string.isRequired,
  applicationKey: PropTypes.string.isRequired,
};

export default ApplicationHome;

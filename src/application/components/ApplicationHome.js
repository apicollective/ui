// @flow
import React from 'react';

import { cleanPath } from 'utils';

import H1 from 'components/H1';
import Markdown from 'components/Markdown';
import ResourceCard from 'application/components/ResourceCard';

import type { Service } from 'generated/version/ServiceType';

import styles from 'application/components/application-home.css';

const ApplicationHome = ({
  service,
  organizationKey,
  applicationKey,
}: {
  service: Service,
  organizationKey: string,
  applicationKey: string,
}) => {
  const buildClickHref = (type, method, path) =>
    `/org/${organizationKey}/app/${applicationKey}/r/${type}/m/${method.toLowerCase()}/p/${cleanPath(path)}`;

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <H1 className={styles.h1}>{service.name}</H1>
        <Markdown
          source={service.description ? service.description : ''}
          className={styles.description}
        />
      </div>
      <div>
        {service.resources.map(resource =>
          resource.operations.map(operation => (
            <ResourceCard
              key={operation.method + operation.path}
              method={operation.method}
              path={operation.path}
              toHref={buildClickHref(
                resource.type,
                operation.method,
                operation.path
              )}
              description={operation.description}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ApplicationHome;

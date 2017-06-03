// @flow
import React from 'react';
import { Link } from 'utils';
import Markdown from 'components/Markdown';
import Header from 'application/components/Header';
import Request from 'application/components/Request';
import Response from 'application/components/Response';
import ResourceCard from 'application/components/ResourceCard';
import H1 from 'components/H1';

import type {
  Operation as OperationServiceType,
  Service,
  Resource as ResourceServiceType,
} from 'generated/version/ServiceType';

import styles from 'application/components/operation.css';

const Operation = ({
  service,
  operation,
  applicationKey,
  organizationKey,
  resource,
  method,
  path,
  importedServices,
}: {
  service: Service,
  operation: OperationServiceType,
  applicationKey: string,
  organizationKey: string,
  resource: ResourceServiceType,
  method: string,
  path: string,
  importedServices: Service[],
}) => (
  <div className={styles.content}>
    <div className={styles.header}>
      <H1 className={styles.h1}>
        <Link
          className={styles.link}
          to={`/org/${organizationKey}/app/${applicationKey}/m/${resource.type}`}
        >
          {resource.type}
        </Link>
      </H1>
      {resource.description &&
        <Markdown
          source={resource.description}
          className={styles.description}
        />}
    </div>
    <div className={styles.resource}>
      <ResourceCard method={operation.method} path={operation.path} />
    </div>
    {operation.description &&
      <Markdown
        source={operation.description}
        className={styles.description}
      />}
    <div className={styles.headers}>
      <Header
        appKey={applicationKey}
        orgKey={organizationKey}
        key={`${method}${resource.type}${path}-header`}
        operation={operation}
        service={service}
        importedServices={importedServices}
      />
    </div>
    <div className={styles.request}>
      <Request
        appKey={applicationKey}
        orgKey={organizationKey}
        key={`${method}${resource.type}${path}-request`}
        operation={operation}
        service={service}
        importedServices={importedServices}
      />
    </div>
    <Response
      appKey={applicationKey}
      orgKey={organizationKey}
      key={`${method}${resource.type}${path}-response`}
      operation={operation}
      service={service}
      importedServices={importedServices}
    />
  </div>
);

export default Operation;

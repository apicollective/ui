// @flow
import React from 'react';

import Markdown from '../../../components/Markdown';
import Header from '../../components/Header';
import Request from '../../components/Request';
import Response from '../../components/Response';
import ResourceCard from '../../components/ResourceCard';

import type { Operation as OperationType, Service } from '../../../generated/version/ServiceType';

import styles from './operation.css';

const Operation = ({ service, operation, applicationKey, organizationKey, resource, method, path, importedServices }: {
  service: Service,
  operation: OperationType,
  applicationKey: string,
  organizationKey: string,
  resource: string,
  method: string,
  path: string,
  importedServices: Service[],
}) =>
  <div className={styles.content}>
    <div className={styles.header}>
      <ResourceCard
        method={operation.method}
        path={operation.path}
      />
    </div>
    <Markdown source={operation.description ? operation.description : ''} className={styles.description} />
    <div className={styles.headers}>
      <Header
        appKey={applicationKey}
        orgKey={organizationKey}
        key={`${method}${resource}${path}-header`}
        operation={operation}
        service={service}
        importedServices={importedServices}
      />
    </div>
    <div className={styles.request}>
      <Request
        key={`${method}${resource}${path}-request`}
        operation={operation}
        service={service}
        importedServices={importedServices}
      />
    </div>
    <Response
      appKey={applicationKey}
      orgKey={organizationKey}
      key={`${method}${resource}${path}-response`}
      operation={operation}
      service={service}
      importedServices={importedServices}
    />
  </div>;

export default Operation;

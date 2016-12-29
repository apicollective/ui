// @flow
import React from 'react';

import { cleanPath } from '../../../utils';
import JsonDoc from '../../components/JsonDoc';
import ParameterListGroup from '../../components/ParameterListGroup';

import type { Operation, Service } from '../../../generated/version/ServiceType';

import styles from './request.css';

const Request = ({ operation, service, importedServices }: {
  operation: Operation,
  service: Service,
  importedServices: Service[],
}) => {
  const body = () => {
    if (operation.body) {
      const baseModel = operation.body.type;
      return (
        <div className={styles.json}>
          <JsonDoc
            key={`${operation.body.type}-requestbody`}
            baseModel={baseModel}
            service={service}
            importedServices={importedServices}
            includeModel={true}
            modelNameClick={() => {}}
          />
        </div>
      );
    } else return null;
  };

  return (
    <div className={styles.container}>
      <ParameterListGroup
        parameters={operation.parameters}
        title="Request"
        service={service}
        importedServices={importedServices}
        parentModel={cleanPath(operation.path)}
      />
      {body()}
    </div>
  );
};

export default Request;

export {
  styles,
};

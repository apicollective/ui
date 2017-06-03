// @flow
import React from 'react';

import { buildNavHref, getType, cleanPath } from 'utils';
import JsonDoc from 'application/components/JsonDoc/JsonDoc';
import ParameterListGroup from 'application/components/ParameterListGroup';

import H2 from 'components/H2';
import type { Operation, Service } from 'generated/version/ServiceType';

import styles from 'application/components/request.css';

const Request = ({
  operation,
  service,
  importedServices,
  orgKey,
  appKey,
}: {
  operation: Operation,
  service: Service,
  importedServices: Service[],
  orgKey: string,
  appKey: string,
}) => {
  const responseParameters = () => {
    if (operation.parameters && !!operation.parameters.length) {
      return (
        <div className={styles.container}>
          <ParameterListGroup
            parameters={operation.parameters}
            title="Request Parameters"
            service={service}
            importedServices={importedServices}
            parentModel={cleanPath(operation.path)}
          />
        </div>
      );
    } else return null;
  };
  const body = () => {
    if (operation.body) {
      const baseModel = operation.body.type;
      return (
        <div className={styles.container}>
          <H2>Request Body</H2>
          <div className={styles.json}>
            <JsonDoc
              key={`${operation.body.type}-requestbody`}
              toHref={buildNavHref({
                organization: orgKey,
                application: appKey,
                model: getType(baseModel),
              })}
              baseModel={baseModel}
              service={service}
              importedServices={importedServices}
              includeModel={true}
            />
          </div>
        </div>
      );
    } else return null;
  };

  return (
    <div>
      {responseParameters()}
      {body()}
    </div>
  );
};

export default Request;

export { styles };

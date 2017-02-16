// @flow
import React from 'react';

import { onClickHref, buildNavHref, getType } from '../../utils';

import H2 from '../../components/H2';
import Markdown from '../../components/Markdown';
import JsonDoc from '../components/JsonDoc/JsonDoc';

import type { Operation, Service } from '../../generated/version/ServiceType';

import styles from './response.css';

const Response = ({ operation, service, importedServices, orgKey, appKey }: {
  operation: Operation,
  service: Service,
  importedServices: Service[],
  orgKey: string,
  appKey: string,
}) => {
  const body = (response) => {
    if (response.type) {
      const baseModel = response.type;
      // TODO make this better, perhaps use isInImportOrService?
      const rawValue = response.type === 'string' || response.type === 'integer' || response.type === 'number' ?
                       `${response.code}` :
                       '';
      const formattedRawValue = response.type === 'string' ? `"${rawValue}"` : rawValue;
      return (
        <div className={styles.json}>
          <JsonDoc
            modelNameClick={
              onClickHref(buildNavHref({
                organization: orgKey, application: appKey, model: getType(baseModel),
              }))
            }
            baseModel={baseModel}
            service={service}
            importedServices={importedServices}
            includeModel={true} // Removes type frrom above jsondoc
            excludeModelDescription={true} // Dont include model description above json doc
            rawValue={formattedRawValue}
          />
        </div>
      );
    } else return null;
  };

  return (
    <div className={styles.response}>
      {operation.responses.map(response =>
        <div key={response.code} className={styles.container}>
          <H2 className={styles.name}>{`${response.code} Response`}</H2>
          <Markdown source={response.description ? response.description : ''} className={styles.description} />
          {body(response)}
        </div>,
      )}
    </div>
  );
};

export default Response;

export {
  styles,
};

// @flow
import React from 'react';

import ParameterList from '../ParameterList';
import * as utils from '../../../utils';

import styles from './json-doc.css';
import type { Service } from '../../../generated/version/ServiceType';

const defaultView =
  (<div className={styles.documentation}>
    <span className={styles.defaultView}>&lt;-- Hover over JSON example for documentation</span>
  </div>);

const Documentation = ({ documentationFullType, service, importedServices }: {
  documentationFullType: string,
  service: Service,
  importedServices: Service[],
}) => {
  if (!documentationFullType) return defaultView;

  const modelName = documentationFullType.substring(0, documentationFullType.lastIndexOf('.'));
  const fieldName = documentationFullType.substring(documentationFullType.lastIndexOf('.') + 1);
  const model = utils.getModel(modelName, service, importedServices);
  const field = model ? model.fields.find(f => f.name === fieldName) : null;

  return (
    <div className={styles.documentation}>
      <ParameterList {...field} service={service} importedServices={importedServices} parentModel={modelName} />
    </div>
  );
};

export default Documentation;

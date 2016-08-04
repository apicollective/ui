// @flow

import React, { PropTypes } from 'react';

import ParameterList from '../ParameterList';
import * as utils from '../../../utils';

import styles from './json-doc.css';
import type { Service } from '../../../generated/version/ServiceType';

const defaultView =
  (<div className={styles.documentation}>
    <span className={styles.defaultView}>&lt;-- Hover over JSON example for documentation</span>
  </div>);

const Documentation = ({ documentationFullType, service, imports }:
                       {documentationFullType: string, service: Service, imports: Array<Service>}) => {
  if (!documentationFullType) return defaultView;

  const modelName = documentationFullType.substring(0, documentationFullType.lastIndexOf('.'));
  const fieldName = documentationFullType.substring(documentationFullType.lastIndexOf('.') + 1);
  const model = utils.getModel(modelName, service, imports);
  const field = model.fields.find(f => f.name === fieldName);

  return (
    <div className={styles.documentation}>
      <ParameterList {...field} service={service} imports={imports} parentModel={modelName} />
    </div>
  );
};

Documentation.propTypes = {
  documentationFullType: PropTypes.string.isRequired,
  service: PropTypes.object.isRequired,
  imports: PropTypes.array.isRequired,
};

export default Documentation;

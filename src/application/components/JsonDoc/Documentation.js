import React, { PropTypes } from 'react';

import ParameterList from '../ParameterList';
import * as utils from '../../../utils';

import styles from './json-doc.css';

const Documentation = ({ documentationFullType, spec, imports }) => {
  if (!documentationFullType) return null;

  const modelName = documentationFullType.substring(0, documentationFullType.lastIndexOf('.'));
  const fieldName = documentationFullType.substring(documentationFullType.lastIndexOf('.') + 1);
  const model = utils.getModel(modelName, spec, imports);
  const field = model.fields.find(f => f.name === fieldName);

  return (
    <div className={styles.documentation}>
      <ParameterList {...field} spec={spec} imports={imports} parentModel={modelName} />
    </div>
  );
};

Documentation.propTypes = {
  documentationFullType: PropTypes.string.isRequired,
  spec: PropTypes.object.isRequired,
  imports: PropTypes.array.isRequired,
};

export default Documentation;

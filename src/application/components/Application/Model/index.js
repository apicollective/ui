import React, { PropTypes } from 'react';

import H1 from '../../../../components/H1';
import H2 from '../../../../components/H2';
import JsonDoc from '../../JsonDoc';
import ParameterListGroup from '../../ParameterListGroup';
import ReactMarkdown from 'react-markdown';
import { getModel, simplifyName } from '../..../../../../../utils';

import styles from './model.css';

const Model = ({ modelName, spec, imports }) => {
  const model = getModel(modelName, spec, imports);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <H1 className={styles.title}>{simplifyName(model.name)}</H1>
        <ReactMarkdown source={model.description ? model.description : ''} className={styles.description} />
      </div>
      <ParameterListGroup
        parameters={model.fields}
        title="Fields"
        spec={spec}
        imports={imports}
        parentModel={model.name}
      />
      <JsonDoc 
        baseModel={model.name}
        spec={spec}
        imports={imports}
        includeModel={false}
      />
    </div>
  );
};
Model.propTypes = {
  modelName: PropTypes.string.isRequired,
  spec: PropTypes.object.isRequired,
  imports: PropTypes.array.isRequired,
};

export default Model;

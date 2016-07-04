import React, { PropTypes } from 'react';

import H1 from '../../../../components/H1';
import Markdown from '../../../../components/Markdown';
import JsonDoc from '../../JsonDoc';
import ParameterListGroup from '../../ParameterListGroup';

import { simplifyName } from '../../../../utils';

import styles from './model.css';

const Model = ({ model, spec, imports, showJsonDoc }) =>
  <div className={styles.container}>
    <div className={styles.header}>
      <H1 className={styles.title}>{simplifyName(model.name)}</H1>
      <Markdown source={model.description ? model.description : ''} className={styles.description} />
    </div>
    <ParameterListGroup
      parameters={model.fields}
      title="Fields"
      spec={spec}
      imports={imports}
      parentModel={model.name}
    />
    <div className={styles.json}>
      {showJsonDoc ?
        <JsonDoc
          baseModel={model.name}
          spec={spec}
          imports={imports}
          includeModel={false}
        /> : null}
    </div>
  </div>;

Model.propTypes = {
  model: PropTypes.object.isRequired,
  spec: PropTypes.object.isRequired,
  imports: PropTypes.array.isRequired,
  showJsonDoc: PropTypes.bool.isRequired,
};

export default Model;

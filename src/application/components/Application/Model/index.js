import React, { PropTypes } from 'react';

import H1 from '../../../../components/H1';
import Markdown from '../../../../components/Markdown';
import JsonDoc from '../../JsonDoc';
import ParameterListGroup from '../../ParameterListGroup';

import { simplifyName } from '../../../../utils';

import styles from './model.css';

const Model = ({ model, service, imports, showJsonDoc }) =>
  <div className={styles.container}>
    <div className={styles.header}>
      <H1 className={styles.title}>{simplifyName(model.name)}</H1>
      <Markdown source={model.description ? model.description : ''} className={styles.description} />
    </div>
    <div className={styles.fieldsContainer}>
      <ParameterListGroup
        parameters={model.fields}
        title="Fields"
        service={service}
        imports={imports}
        parentModel={model.name}
      />
      <div className={styles.json}>
        {showJsonDoc ?
          <JsonDoc
            baseModel={model.name}
            service={service}
            imports={imports}
            includeModel={false}
          /> : null}
      </div>
    </div>
  </div>;

Model.propTypes = {
  model: PropTypes.object.isRequired,
  service: PropTypes.object.isRequired,
  imports: PropTypes.array.isRequired,
  showJsonDoc: PropTypes.bool.isRequired,
};

export default Model;

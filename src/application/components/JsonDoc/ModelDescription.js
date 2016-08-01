import React, { PropTypes } from 'react';

import H2 from '../../../components/H2';
import Markdown from '../../../components/Markdown';

import * as utils from '../../../utils';
import styles from './json-doc.css';

const ModelDescription = ({ baseModel, spec, imports, modelNameClick }) => {
  const type = utils.getType(baseModel);
  const model = utils.getModel(type, spec, imports);

  //   <H2 click={model ? this.props.modelNameClick : null} className={styles.modelName}>
  //   <H2 className={styles.modelName}>
  return (
    <div className={styles.modelDescription}>
      <H2 className={styles.modelName}>
        {utils.simplifyName(baseModel)}
      </H2>
      {model && model.description ?
        <Markdown source={model.description ? model.description : ''} className={styles.description} /> : null}
    </div>
  );
};
ModelDescription.propTypes = {
  baseModel: PropTypes.string.isRequired,
  spec: PropTypes.object.isRequired,
  imports: PropTypes.array.isRequired,
  modelNameClick: PropTypes.func,
};

export default ModelDescription;

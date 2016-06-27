import React, { PropTypes } from 'react';

import H1 from '../../../../components/H1';
import H2 from '../../../../components/H2';
import JsonDoc from '../../JsonDoc';

const Model = ({ modelName, spec }) => {
  const model = spec.models.find(m => m.name === modelName);
  return (
    <div>
      <H1>{model.name}</H1>
      
      <H2>Fields</H2>
      <JsonDoc baseModel={model.name} spec={spec} />
    </div>
  );
};
Model.propTypes = {
  modelName: PropTypes.string.isRequired,
  spec: PropTypes.object.isRequired,
};

export default Model;

import React, { PropTypes } from 'react';

const Model = (props) => {
  return (
    <div>
      Model {props.spec.name}
    </div>
  );
};

Model.propTypes = {
  spec: PropTypes.object.isRequired,
};

export default Model;

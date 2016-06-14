import React, { PropTypes } from 'react';

const BodyType = (props) => {
  return (
     <div>
       BodyType {props.spec.name}
     </div>
  );
};

BodyType.propTypes = {
  spec: PropTypes.object.isRequired,
};

export default BodyType;

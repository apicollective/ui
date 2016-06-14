import React, { Component, PropTypes } from 'react';

import BodyType from './BodyType';

class Body extends Component {
  render() {

    const spec = {
      name: 'test',
    };

    return (
      <div>
        Body:
        <BodyType spec={spec} />
      </div>
    );
  }
}

Body.propTypes = {
  // spec: PropTypes.object.isRequired,
};

export default Body;

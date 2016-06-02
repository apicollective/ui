import React, { Component, PropTypes } from 'react';

class Model extends Component {
  render() {
    return (
      <div>
        Model {this.props.spec.name}
      </div>
    );
  }
}

Model.propTypes = {
  spec: PropTypes.object.isRequired,
};

export default Model;

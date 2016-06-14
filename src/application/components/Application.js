import React, { Component, PropTypes } from 'react';

import Resource from './Resource';
import { service } from './service';

import '../../general.css';

class Application extends Component {
  render() {
    return (
      <div>
        <div className="section" id="desription">
          <h1>{service.name}</h1>
          <p>{service.description}</p>
        </div>
        <div className="section" id="resources">
          <h2>Resources</h2>
          {service.resources.map(
            (todo, id) => <Resource />
          )}
        </div>
      </div>
    );
  }
}

Application.propTypes = {
  // service: PropTypes.object.isRequired,
  description: PropTypes.string,
};

export default Application;

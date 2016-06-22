import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import JsonDoc from './../JsonDoc';
import { cleanPath } from '../../../utils';

import styles from './application.css';

import { actions as specActions } from '../../../generated/version';
const allActions = Object.assign({}, specActions);

const Request = ({ operation, spec }) => {
  const body = () => {
    if (operation.body) {
      const baseModel = operation.body.type;
      return (
        <div>
          <h3>Body</h3>
          <JsonDoc baseModel={baseModel} spec={spec} />
        </div>
      );
    } else return null;
  };

  return (
    <div>
      <h2>Request</h2>
      {operation.parameters.map((param, id) => (
        <div key={id}>{param.name}</div>
      ))}
    {body()}
    </div>
  );
};
Request.propTypes = {
  operation: PropTypes.object.isRequired,
  spec: PropTypes.object.isRequired,
};

const Response = ({ operation, spec }) => {
  const body = (response) => {
    if (response.type) {
      const baseModel = response.type;
      return (
        <div>
          <h3>Body</h3>
          <JsonDoc baseModel={baseModel} spec={spec} />
        </div>
      );
    } else return null;
  };

  return (
    <div>
      <h2>Response</h2>
      {operation.responses.map((response, id) => (
        <div key={id}>
          <div>{response.code.integer.value}</div>
          {body(response)}
        </div>
      ))}
    </div>
  );
};
Response.propTypes = {
  operation: PropTypes.object.isRequired,
  spec: PropTypes.object.isRequired,
};

class Application extends Component {

  componentDidMount() {
    const orgKey = this.props.params.organizationKey;
    const applicationKey = this.props.params.applicationKey;
    this.props.actions.getByOrgkeyAndApplicationkeyAndVersion_get(
      { orgKey, applicationKey, version: 'latest' }
    );
  }

  getOperation(type, method, path, spec) {
    const resource = spec.resources.find(r => r.type === type);
    const operation = resource.operations.find((o) => (
      o.method.toLowerCase() === method && cleanPath(o.path) === path
    ));
    return operation;
  }

  render() {
    const { spec } = this.props;
    if (!this.props.loaded) {
      // First Load
      return (<div></div>);
    } else if (this.props.params.resource) {
      // Load Operation
      const { resource, method, path } = this.props.params;
      const operation = this.getOperation(resource, method, path, spec);
      return (
        <div>
          <h1>{spec.name}</h1>
          {spec.description}
          <h2>{operation.method} {operation.path}</h2>
          <Request operation={operation} spec={spec} />
          <Response operation={operation} spec={spec} />
        </div>
      );
    } else {
      // No Operation
      return (
        <div>
          <h1>{spec.name} Testing</h1>
          {spec.description}
          <div>
            {spec.resources.map((resource, id) => (
              resource.operations.map((operation, resourceId) => (
                <div>{operation.method} {operation.path}</div>
              ))
            ))}
          </div>
        </div>
      );
    }
  }
}
Application.propTypes = {
  actions: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  loaded: PropTypes.bool.isRequired,
  spec: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => (
  {
    loaded: state.application.get('loaded'),
    spec: state.application.get('spec'),
  }
);

const mapDispatchToProps = (dispatch) => (
  { actions: bindActionCreators(allActions, dispatch) }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Application);

export {
  styles,
};

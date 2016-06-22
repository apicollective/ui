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
    }
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
    }
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
    console.log(spec)

    const resource = spec.resources.find(r => r.type === type);
    const operation = resource.operations.find((o) => (
      o.method.toLowerCase() === method && cleanPath(o.path) === path
    ));
    return operation;
  }

  render() {
    const { spec } = this.props;
    if (this.props.loaded) {
      const { resource, method, path } = this.props.params;
      const operation = this.getOperation(resource, method, path, spec);
      return (
        <div>
          <h1>{operation.method} {operation.path}</h1>
          <Request operation={operation} spec={spec} />
          <Response operation={operation} spec={spec} />
        </div>
      );
    } else {
      return (
        <div>
          <h1>{spec.name}</h1>
          Think about listing resources here
        </div>
      );
    }
  }
}
Application.propTypes = {
  loaded: PropTypes.bool.isRequired,
  spec: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => (
  {
    loaded: state.application.get('loaded'),
    spec: state.application.get('spec')
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

// const sideItems = [
//   {
//     name: 'Resources',
//     items: [
//       {
//         name: 'Generator',
//         items: [
//           { name: 'POST /member', href: '' },
//           { name: 'POST /members', href: '' },
//           { name: 'GET /member/:id', href: '' },
//         ],
//       },
//       {
//         name: 'Healthcheck',
//         items: [
//           { name: 'GET /', href: '' },
//         ],
//       },
//     ],
//   },
//   {
//     name: 'Models',
//     items: [
//       {
//         items: [
//           { name: 'Person - Model', href: '' },
//           { name: 'Address - Model', href: '' },
//           { name: 'Gender - Enum', href: '' },
//         ],
//       },
//     ],
//   },
// ];

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LoadingOverlay from '../../../components/LoadingOverlay';
import Operation from '../../components/Operation';
import ApplicationHome from '../../components/ApplicationHome';
import * as utils from '../../../utils';
import Model from './Model';

import styles from './application.css';

import { actions as serviceActions } from '../../../generated/version';
const allActions = Object.assign({}, serviceActions);

class Application extends Component {

  componentDidMount() {
    const orgKey = this.props.params.organizationKey;
    const applicationKey = this.props.params.applicationKey;
    this.props.actions.getByOrgkeyAndApplicationkeyAndVersion_get(
      { orgKey, applicationKey, version: 'latest' }
    );
  }

  render() {
    const { imports, service } = this.props;
    if (!this.props.loaded) {
      // First Load
      return (<LoadingOverlay />);
    } else if (this.props.params.resource) {
      // Load Operation
      const {
        resource,
        method,
        path,
        applicationKey,
        organizationKey,
      } = this.props.params;
      const operation = utils.getOperation(resource, method, path, service);

      return (<Operation
        service={service}
        imports={imports}
        operation={operation}
        applicationKey={applicationKey}
        organizationKey={organizationKey}
        resource={resource}
        method={method}
        path={path}
      />);
    } else if (this.props.params.model) {
      // Load Model
      const modelName = this.props.params.model;
      if (utils.isEnum(modelName, service, imports)) {
        const enumModel = utils.getEnum(modelName, service, imports);
        enumModel.fields = enumModel.values.map((value) => (
          { name: value.name, description: value.description, type: 'string', required: false }
        ));
        return <Model model={enumModel} service={service} imports={imports} showJsonDoc={false} />;
      } else {
        const model = utils.getModel(modelName, service, imports);
        return <Model model={model} service={service} imports={imports} showJsonDoc={true} />;
      }
    } else {
      // Load Application Home
      const {
        applicationKey,
        organizationKey,
      } = this.props.params;

      return (<ApplicationHome
        service={service}
        applicationKey={applicationKey}
        organizationKey={organizationKey}
      />);
    }
  }
}
Application.propTypes = {
  actions: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  loaded: PropTypes.bool.isRequired,
  service: PropTypes.object.isRequired,
  imports: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => (
  {
    loaded: state.application.get('loaded'),
    service: state.application.get('service'),
    imports: state.application.get('imports'),
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

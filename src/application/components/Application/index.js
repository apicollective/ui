import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';

import LoadingOverlay from '../../../components/LoadingOverlay';
import Operation from '../../components/Operation';
import ApplicationHome from '../../components/ApplicationHome';
import * as utils from '../../../utils';
import Model from './Model';

import styles from './application.css';

import { actions as specActions } from '../../../generated/version';
const allActions = Object.assign({}, specActions);

class Application extends Component {

  componentDidMount() {
    const orgKey = this.props.params.organizationKey;
    const applicationKey = this.props.params.applicationKey;
    this.props.actions.getByOrgkeyAndApplicationkeyAndVersion_get(
      { orgKey, applicationKey, version: 'latest' }
    );
  }

  render() {
    const { imports, spec } = this.props;
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
      const operation = utils.getOperation(resource, method, path, spec);

      return (<Operation
        spec={spec}
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
      if (utils.isEnum(modelName, spec, imports)) {
        const enumModel = utils.getEnum(modelName, spec, imports);
        enumModel.fields = enumModel.values.map((value) => (
          { name: value.name, description: value.description, type: 'string', required: false }
        ));
        return <Model model={enumModel} spec={spec} imports={imports} showJsonDoc={false} />;
      } else {
        const model = utils.getModel(modelName, spec, imports);
        return <Model model={model} spec={spec} imports={imports} showJsonDoc={true} />;
      }
    } else {
      // Load Application Home
      const {
        applicationKey,
        organizationKey,
      } = this.props.params;

      return (<ApplicationHome
        spec={spec}
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
  spec: PropTypes.object.isRequired,
  imports: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => (
  {
    loaded: state.application.get('loaded'),
    spec: state.application.get('spec'),
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

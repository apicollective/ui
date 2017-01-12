// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LoadingOverlay from '../../components/LoadingOverlay';
import Operation from '../components/Operation';
import ApplicationHome from '../components/ApplicationHome';
import * as utils from '../../utils';
import Model from './Model';

import type { Service } from '../../generated/version/ServiceType';

import styles from './application.css';

import { actions as serviceActions } from '../../generated/version';

const allActions = Object.assign({}, serviceActions);

type Props = {
  actions: Object, // FIXME
  params: Object, // FIXME
  loaded: boolean,
  service: Service,
  importedServices: Service[],
}

class Application extends Component {
  props: Props;

  componentDidMount() {
    const orgKey = this.props.params.organizationKey;
    const applicationKey = this.props.params.applicationKey;
    this.props.actions.getByOrgkeyAndApplicationkeyAndVersion_get(
      { orgKey, applicationKey, version: 'latest' },
    );
  }


  render() {
    const { service, importedServices } = this.props;

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

      return (
        <Operation
          service={service}
          importedServices={importedServices}
          operation={operation}
          applicationKey={applicationKey}
          organizationKey={organizationKey}
          resource={resource}
          method={method}
          path={path}
        />
      );
    } else if (this.props.params.model) {
      // Load Model
      const modelName = this.props.params.model;
      if (utils.isEnum(modelName, service, importedServices)) {
        // FIXME - not sure if this is enum or model? Need a test case
        const enumModel = utils.getEnum(modelName, service, importedServices);
        /* if (enumModel) {
         *   enumModel.fields = enumModel.values.map(value => (
         *     { name: value.name, description: value.description, type: 'string', required: false }
         *   ));
         * }*/
        return <Model model={enumModel} service={service} importedServices={importedServices} showJsonDoc={false} />;
      } else {
        const model = utils.getModel(modelName, service, importedServices);
        return <Model model={model} service={service} importedServices={importedServices} showJsonDoc={true} />;
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

const mapStateToProps = state => (
  {
    loaded: state.application.loaded,
    service: state.application.service,
    importedServices: state.application.importedServices,
  }
);

const mapDispatchToProps = dispatch => (
  { actions: bindActionCreators(allActions, dispatch) }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Application);

export {
  styles,
};

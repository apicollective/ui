// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LoadingOverlay from 'components/LoadingOverlay';
import Operation from 'application/components/Operation';
import ApplicationHome from 'application/components/ApplicationHome';
import * as utils from 'utils';
import Model from 'application/components/Model';
import Enum from 'application/components/Enum';

import { actions as serviceActions } from 'generated/version';

import type { Service } from 'generated/version/ServiceType';
import type { Match } from 'params';

import styles from 'application/components/application.css';

const allActions = Object.assign({}, serviceActions);

type Params = {|
  model?: string,
  resource?: string,
  method: string,
  path: string,
  applicationKey: string,
  organizationKey: string,
|};

type Props = {|
  actions: Object, // FIXME
  match: Match<Params>,
  loaded: boolean,
  service: Service,
  importedServices: Service[],
|};

export class Application extends Component {
  props: Props;

  componentDidMount() {
    const orgKey = this.props.match.params.organizationKey;
    const applicationKey = this.props.match.params.applicationKey;
    this.props.actions.getByOrgkeyAndApplicationkeyAndVersion_get({
      orgKey,
      applicationKey,
      version: 'latest',
    });
  }

  render() {
    const { service, importedServices } = this.props;

    if (!service) {
      return <LoadingOverlay isLoaded={this.props.loaded} />;
    }
    if (this.props.match.params.resource) {
      // Load Operation
      const {
        method,
        path,
        resource: resourceType,
        applicationKey,
        organizationKey,
      } = this.props.match.params;

      const operation = utils.getOperation(resourceType, method, path, service);
      const resource = utils.getResource(resourceType, service);

      return (
        <LoadingOverlay isLoaded={this.props.loaded}>
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
        </LoadingOverlay>
      );
    } else if (this.props.match.params.model) {
      // Load Model
      const modelName = this.props.match.params.model;
      if (utils.isEnum(modelName, service, importedServices)) {
        const enumModel = utils.getEnum(modelName, service, importedServices);
        return enumModel
          ? <LoadingOverlay isLoaded={this.props.loaded}>
              <Enum
                enumModel={enumModel}
                service={service}
                importedServices={importedServices}
              />
            </LoadingOverlay>
          : null;
      } else {
        const model = utils.getModel(modelName, service, importedServices);
        return model
          ? <LoadingOverlay isLoaded={this.props.loaded}>
              <Model
                model={model}
                service={service}
                importedServices={importedServices}
                showJsonDoc={true}
              />
            </LoadingOverlay>
          : null;
      }
    } else {
      // Load Application Home
      const { applicationKey, organizationKey } = this.props.match.params;

      return (
        <LoadingOverlay isLoaded={this.props.loaded}>
          <ApplicationHome
            service={service}
            applicationKey={applicationKey}
            organizationKey={organizationKey}
          />
        </LoadingOverlay>
      );
    }
  }
}

const mapStateToProps = state => ({
  loaded: state.application.loaded,
  service: state.application.service,
  importedServices: state.application.importedServices,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(allActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Application);

export { styles };

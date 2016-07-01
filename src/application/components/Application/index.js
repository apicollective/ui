import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';

import H1 from '../../../components/H1';
import LoadingOverlay from '../../../components/LoadingOverlay';
import Operation from '../../components/Operation';
import ResourceCard from '../ResourceCard';
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
        organizationKey 
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
      />)
      
    } else if (this.props.params.model) {
      // Load Model
      const {
        model
      } = this.props.params;
      if (utils.isEnum(model, spec, imports)) {
        const enumModel = utils.getEnum(model, spec, imports);
        enumModel.fields = enumModel.values.map((value) => (
          { name: value.name, description: value.description, type: 'string', required: false }
        ));
        return <Model model={enumModel} spec={spec} imports={imports} showJsonDoc={false} />;
      } else {
        const model = utils.getModel(model, spec, imports);
        return <Model model={model} spec={spec} imports={imports} showJsonDoc={true} />;
      }
    } else {
      // No Operation
      const {
        applicationKey,
        organizationKey
      } = this.props.params;

      const buildClickHref = (type, method, path) =>
        `/org/${organizationKey}/app/${applicationKey}/r/${type}/m/${method.toLowerCase()}/p/${utils.cleanPath(path)}`;
      return (
        <div>
          <div className={styles.header}>
            <H1 className={styles.h1}>{spec.name}</H1>
            <p className={styles.description}>{spec.description}</p>
          </div>
          <div>
        {spec.resources.map(resource => (
          resource.operations.map(operation =>
            <ResourceCard
              key={operation.method + operation.path}
              method={operation.method}
              path={operation.path}
              click={utils.onClickHref(buildClickHref(resource.type, operation.method, operation.path))}
            />
          )
         ))
        }
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

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';

import JsonDoc from './../JsonDoc';
import H1 from '../../../components/H1';
import H2 from '../../../components/H2';
import ParameterListGroup from '../ParameterListGroup';
import ResourceCard from '../ResourceCard';
import * as utils from '../../../utils';
import Model from './Model';

import styles from './application.css';

import { actions as specActions } from '../../../generated/version';
const allActions = Object.assign({}, specActions);

const Request = ({ operation, spec, imports, orgKey, appKey }) => {
  const body = () => {
    if (operation.body) {
      const baseModel = operation.body.type;
      return (
        <div>
          <h3>Body</h3>
          <H2
            click={utils.onClickHref(utils.buildNavHref({
              organization: orgKey, application: appKey, model: utils.getType(baseModel),
            }))}
            className={styles.modelName}
          >
            {utils.simplifyName(baseModel)}
          </H2>
          <JsonDoc key={`${operation.body}-requestbody`} baseModel={baseModel} spec={spec} imports={imports} />
        </div>
      );
    } else return null;
  };

  return (
    <div>
      <ReactMarkdown source={operation.description ? operation.description : ''} className={styles.description} />
      <ParameterListGroup
        parameters={operation.parameters}
        title="Request"
        spec={spec}
        imports={imports}
        parentModel={utils.cleanPath(operation.path)}
      />
      {body()}
    </div>
  );
};
Request.propTypes = {
  operation: PropTypes.object.isRequired,
  spec: PropTypes.object.isRequired,
  imports: PropTypes.array.isRequired,
  orgKey: PropTypes.string.isRequired,
  appKey: PropTypes.string.isRequired,
};

const Response = ({ operation, spec, imports, orgKey, appKey }) => {
  const body = (response) => {
    if (response.type) {
      const baseModel = response.type;
      return (
        <div>
          <h3>Body</h3>
          <JsonDoc
            modelNameClick={
              utils.onClickHref(utils.buildNavHref({
                organization: orgKey, application: appKey, model: utils.getType(baseModel),
              }))
            }
            baseModel={baseModel}
            spec={spec}
            imports={imports}
            includeModel={true}
            excludeModelDescription={true}
          />
        </div>
      );
    } else return null;
  };

  return (
    <div className={classnames(styles.section, styles.response)}>
      <H2>Response</H2>
      {operation.responses.map((response, id) => (
        <div key={id}>
          <div>{response.code.integer.value}</div>
          <ReactMarkdown source={response.description ? response.description : ''} className={styles.description} />
          {body(response)}
        </div>
      ))}
    </div>
  );
};
Response.propTypes = {
  operation: PropTypes.object.isRequired,
  spec: PropTypes.object.isRequired,
  imports: PropTypes.array.isRequired,
  orgKey: PropTypes.string.isRequired,
  appKey: PropTypes.string.isRequired,
};


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
      return (<div></div>);
    } else if (this.props.params.resource) {
      // Load Operation
      const { resource, method, path } = this.props.params;
      const operation = utils.getOperation(resource, method, path, spec);
      return (
        <div>
          <div className={styles.header}>
            <H1 className={styles.h1}>{spec.name}</H1>
            <p className={styles.description}>{spec.description}</p>
          </div>
          <H2>{operation.method} {operation.path}</H2>
          {operation.parameters.size > 0 ? <Request
            appKey={this.props.params.applicationKey}
            orgKey={this.props.params.organizationKey}
            key={`${method}${resource}${path}-request`}
            operation={operation}
            spec={spec}
            imports={imports}
          /> : null}
          <Response
            appKey={this.props.params.applicationKey}
            orgKey={this.props.params.organizationKey}
            key={`${method}${resource}${path}-response`}
            operation={operation}
            spec={spec}
            imports={imports}
          />
        </div>
      );
    } else if (this.props.params.model) {
      if (utils.isEnum(this.props.params.model, spec, imports)) {
        const enumModel = utils.getEnum(this.props.params.model, spec, imports);
        enumModel.fields = enumModel.values.map((value) => (
          { name: value.name, description: value.description, type: 'string', required: false }
        ));
        return <Model model={enumModel} spec={spec} imports={imports} showJsonDoc={false} />;
      } else {
        const model = utils.getModel(this.props.params.model, spec, imports);
        return <Model model={model} spec={spec} imports={imports} showJsonDoc={true} />;
      }
    } else {
      // No Operation
      const orgKey = this.props.params.organizationKey;
      const appKey = this.props.params.applicationKey;

      const buildClickHref = (type, method, path) =>
        `/org/${orgKey}/app/${appKey}/r/${type}/m/${method.toLowerCase()}/p/${utils.cleanPath(path)}`;
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

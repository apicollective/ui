import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';

import JsonDoc from './../JsonDoc';
import H1 from '../../../components/H1';
import H2 from '../../../components/H2';
import ParameterList from '../ParameterList';
import ResourceCard from '../ResourceCard';
import { buildNavHref, cleanPath, getOperation, getType, isEnum, onClickHref, simplifyName } from '../../../utils';
import Model from './Model';
import EnumModel from './EnumModel';

import styles from './application.css';

import { actions as specActions } from '../../../generated/version';
const allActions = Object.assign({}, specActions);

const Request = ({ operation, spec, orgKey, appKey }) => {
  const body = () => {
    if (operation.body) {
      const baseModel = operation.body.type;
      return (
        <div>
          <h3>Body</h3>
          <H2
            click={onClickHref(buildNavHref({ organization: orgKey, application: appKey, model: getType(baseModel) }))}
            className={styles.modelName}
          >
            {simplifyName(baseModel)}
          </H2>
          <JsonDoc key={`${operation.body}-requestbody`} baseModel={baseModel} spec={spec} />
        </div>
      );
    } else return null;
  };

  return (
    <div className={classnames(styles.section, styles.request)}>
      <H2 className={styles.sectionHeader}>Request</H2>
      <ReactMarkdown source={operation.description ? operation.description : ''} className={styles.description} />
      {operation.parameters.map((param, id) => (
        <ParameterList key={id} {...param} spec={spec} parentModel={cleanPath(operation.path)} />
      ))}
    {body()}
    </div>
  );
};
Request.propTypes = {
  operation: PropTypes.object.isRequired,
  spec: PropTypes.object.isRequired,
  orgKey: PropTypes.string.isRequired,
  appKey: PropTypes.string.isRequired,
};

const Response = ({ operation, spec, orgKey, appKey }) => {
  const body = (response) => {
    if (response.type) {
      const baseModel = response.type;
      return (
        <div>
          <h3>Body</h3>
          <JsonDoc
            modelNameClick={
              onClickHref(buildNavHref({ organization: orgKey, application: appKey, model: getType(baseModel) }))
            }
            baseModel={baseModel}
            spec={spec}
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
    const { spec } = this.props;
    if (!this.props.loaded) {
      // First Load
      return (<div></div>);
    } else if (this.props.params.resource) {
      // Load Operation
      const { resource, method, path } = this.props.params;
      const operation = getOperation(resource, method, path, spec);
      return (
        <div>
          <div className={styles.header}>
            <H1 className={styles.h1}>{spec.name}</H1>
            <p className={styles.description}>{spec.description}</p>
          </div>
          <H2>{operation.method} {operation.path}</H2>
          <Request
            appKey={this.props.params.applicationKey}
            orgKey={this.props.params.organizationKey}
            key={`${method}${resource}${path}-request`}
            operation={operation} spec={spec}
          />
          <Response
            appKey={this.props.params.applicationKey}
            orgKey={this.props.params.organizationKey}
            key={`${method}${resource}${path}-response`}
            operation={operation}
            spec={spec}
          />
        </div>
      );
    } else if (this.props.params.model) {
      if (isEnum(this.props.params.model, spec)) {
        return <EnumModel enumName={this.props.params.model} spec={spec} />;
      } else {
        return <Model modelName={this.props.params.model} spec={spec} />;
      }
    } else {
      // No Operation
      const orgKey = this.props.params.organizationKey;
      const appKey = this.props.params.applicationKey;

      const buildClickHref = (type, method, path) =>
        `/org/${orgKey}/app/${appKey}/r/${type}/m/${method.toLowerCase()}/p/${cleanPath(path)}`;
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
              key={operation.path}
              method={operation.method}
              path={operation.path}
              click={onClickHref(buildClickHref(resource.type, operation.method, operation.path))}
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

import React, { Component, PropTypes } from 'react';

import H2 from '../../../components/H2';
import Markdown from '../../../components/Markdown';
import ParameterList from '../ParameterList';

import * as utils from '../../../utils';

import styles from './json-doc.css';

const numSpaces = 4;

const spaces = (indent) => new Array(indent * numSpaces).join(' ');

// --    "name": "value",
/* eslint-disable max-len */
const FieldValue = ({ name, value, fullType, indent, mouseOver, click }) =>
  <a href={`#${fullType}`} className={styles.link} data-fullType={fullType} onMouseOver={mouseOver} onClick={click}>
    <span className={styles.name}>{spaces(indent)}"{name}"</span>: <span className={styles.value}>{value}</span>,{`\n`}
  </a>;
/* eslint-enable */

FieldValue.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  fullType: PropTypes.string.isRequired,
  indent: PropTypes.number.isRequired,
  mouseOver: PropTypes.func.isRequired,
  click: PropTypes.func.isRequired,
};

// --    "name":
const FieldEmpty = ({ name, fullType, indent, mouseOver, click }) =>
  <a href={`#${fullType}`} className={styles.link} data-fullType={fullType} onMouseOver={mouseOver} onClick={click}>
    <span className={styles.name}>{spaces(indent)}"{name}"</span>:
  </a>;

FieldEmpty.propTypes = {
  name: PropTypes.string.isRequired,
  fullType: PropTypes.string.isRequired,
  indent: PropTypes.number.isRequired,
  mouseOver: PropTypes.func.isRequired,
  click: PropTypes.func.isRequired,
};

// --   "value",
const StringValue = ({ value, fullType, indent, mouseOver, click }) =>
  <a href={`#${fullType}`} className={styles.link} data-fullType={fullType} onMouseOver={mouseOver} onClick={click} >
    <span className={styles.name}>{spaces(indent)}"{value}"</span>{`\n`}
  </a>;

StringValue.propTypes = {
  value: PropTypes.string.isRequired,
  indent: PropTypes.number.isRequired,
  mouseOver: PropTypes.func.isRequired,
  fullType: PropTypes.string,
  click: PropTypes.func.isRequired,
};

const ArrayValue = ({ name, fullType, indent, mouseOver, click }) =>
  <div>
    <FieldEmpty name={name} fullType={fullType} indent={indent} mouseOver={mouseOver} click={click} /> {'[\n'}
    <StringValue value={name} fullType={fullType} indent={indent + 1} mouseOver={mouseOver} click={click} />
    {`${spaces(indent)}],`}
  </div>;

ArrayValue.propTypes = {
  name: PropTypes.string.isRequired,
  fullType: PropTypes.string.isRequired,
  indent: PropTypes.number.isRequired,
  mouseOver: PropTypes.func.isRequired,
  click: PropTypes.func.isRequired,
};

const renderModel = (key, name, type, fullType, spec, imports, indent, mouseOver, parentModel) => {
  let open = '{';
  let close = '}';
  if (utils.isArray(type)) {
    open = '[{';
    close = '}]';
  } else if (utils.isEnum(type, spec, imports)) {
    open = '[';
    close = ']';
  }
  return (
    <Model
      key={key}
      name={name}
      type={type}
      fullType={fullType}
      spec={spec}
      imports={imports}
      indent={indent}
      mouseOver={mouseOver}
      open={open}
      close={close}
      click={utils.onClickHref(utils.buildNavHref({
        organization: spec.organization.key,
        application: spec.application.key,
        model: utils.getType(parentModel),
      }))}
    />
  );
};

const ModelInner = ({ type, fullType, spec, imports, indent, mouseOver }) => {
  if (utils.isEnum(type, spec, imports)) {
    // Enum Value
    const enumModel = utils.getEnum(type, spec, imports);

    return (
      <StringValue
        value={enumModel.values[0].name}
        fullType={fullType}
        indent={indent + 1}
        mouseOver={mouseOver}
        click={utils.onClickHref(utils.buildNavHref({
          organization: spec.organization.key,
          application: spec.application.key,
          model: utils.getType(type),
        }))}
      />
    );
  } else {
    // Model, Array, Field
    const model = utils.getModel(type, spec, imports);
    return (
      <div>
        {model.fields.map((field, id) => {
          const example = utils.isISODateTime(field.type) ?
                          new Date('2016-03-24T13:56:45.242Z').toISOString() : field.example;
          const value = utils.isEnum(field.type, spec, imports) ?
                        utils.getEnumExampleValue(utils.getEnum(field.type, spec)) :
                        example;
          const verifiedValue = value || '';
          const formattedValue = field.type === 'integer' || field.type === 'number'
                                ? verifiedValue : `"${verifiedValue}"`;

          if (utils.isModel(field.type, spec, imports)) {
            return renderModel(
              id, field.name, field.type, `${type}.${field.name}`, spec, imports, indent + 1, mouseOver, model.name
            );
          } else if (utils.isArray(field.type)) {
            return (
              <ArrayValue
                key={id}
                name={field.name}
                value={formattedValue}
                fullType={`${type}.${field.name}`}
                indent={indent + 1}
                mouseOver={mouseOver}
                click={utils.onClickHref(utils.buildNavHref({
                  organization: spec.organization.key,
                  application: spec.application.key,
                  model: utils.getType(model.name),
                }))}
              />);
          } else {
            return (
              <FieldValue
                key={id}
                name={field.name}
                value={formattedValue}
                fullType={`${utils.getType(type)}.${field.name}`}
                indent={indent + 1}
                mouseOver={mouseOver}
                click={utils.onClickHref(utils.buildNavHref({
                  organization: spec.organization.key,
                  application: spec.application.key,
                  model: utils.getType(type),
                }))}
              />);
          }
        })}
      </div>
    );
  }
};

ModelInner.propTypes = {
  type: PropTypes.string.isRequired,
  fullType: PropTypes.string,
  spec: PropTypes.object.isRequired,
  imports: PropTypes.array.isRequired,
  indent: PropTypes.number.isRequired,
  mouseOver: PropTypes.func.isRequired,
};

const Model = ({ name, type, fullType, spec, imports, indent, mouseOver, open, close, click }) =>
  <div>
    <FieldEmpty name={name} fullType={fullType} indent={indent} mouseOver={mouseOver} click={click} /> {open}
    <ModelInner
      type={utils.getType(type)} fullType={fullType} spec={spec} imports={imports} indent={indent} mouseOver={mouseOver}
    />
    {`${spaces(indent)}${close},`}
  </div>;

Model.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  fullType: PropTypes.string.isRequired,
  spec: PropTypes.object.isRequired,
  imports: PropTypes.array.isRequired,
  indent: PropTypes.number.isRequired,
  mouseOver: PropTypes.func.isRequired,
  open: PropTypes.string.isRequired,
  close: PropTypes.string.isRequired,
  click: PropTypes.func.isRequired,
};


const Documentation = ({ field, spec, imports, parentModel }) =>
  <div className={styles.documentation}>
    <ParameterList {...field} spec={spec} imports={imports} parentModel={parentModel} />
  </div>;

Documentation.propTypes = {
  field: PropTypes.object.isRequired,
  spec: PropTypes.object.isRequired,
  imports: PropTypes.array.isRequired,
  parentModel: PropTypes.string.isRequired,
};

class JsonDoc extends Component {

  constructor(props) {
    super(props);
    this.state = { documentationFullType: '' };

    this.mouseOver = (event) => {
      const documentationFullType = event.currentTarget.dataset.fulltype;
      this.setState({ documentationFullType });
    };
  }

  getDocumentation(documentationFullType, spec, imports) {
    if (!documentationFullType) return '';

    const modelName = documentationFullType.substring(0, documentationFullType.lastIndexOf('.'));
    const fieldName = documentationFullType.substring(documentationFullType.lastIndexOf('.') + 1);
    const model = utils.getModel(modelName, spec, imports);
    const field = model.fields.find(f => f.name === fieldName);

    return <Documentation field={field} spec={spec} imports={imports} parentModel={modelName} />;
  }

  getModel(baseModel, spec, imports, includeModel) {
    const docs = () => {
      const type = utils.getType(baseModel);
      const model = utils.getModel(type, spec, imports);
      return (
        <div>
          <H2 click={model ? this.props.modelNameClick : null} className={styles.modelName}>
            {utils.simplifyName(baseModel)}
          </H2>
          {model && model.description && !this.props.excludeModelDescription ?
            <Markdown source={model.description ? model.description : ''} className={styles.description} /> : null}
        </div>
      );
    };
    return includeModel ? docs() : null;
  }

  render() {
    const { baseModel, spec, imports, includeModel } = this.props;
    return (
      <div className={styles.jsonDoc}>
        {this.getModel(baseModel, spec, imports, includeModel)}
        <div className={styles.container}>
          {utils.isImportOrInSpec(baseModel, spec, imports) ?
            <pre className={styles.code}>
            {utils.isArray(baseModel) ? '[{' : '{'}
              <ModelInner
                type={baseModel}
                spec={spec}
                imports={imports}
                indent={0}
                mouseOver={this.mouseOver}
              />
            {utils.isArray(baseModel) ? '}]' : '}'}
            </pre>
           : null}
          {this.getDocumentation(this.state.documentationFullType, spec, imports)}
        </div>
      </div>
    );
  }
}
JsonDoc.propTypes = {
  spec: PropTypes.object.isRequired,
  imports: PropTypes.array.isRequired,
  baseModel: PropTypes.string.isRequired,
  includeModel: PropTypes.bool, // Include Model Documentation in JsonDoc
  excludeModelDescription: PropTypes.bool,
  modelNameClick: PropTypes.func,
};

export default JsonDoc;

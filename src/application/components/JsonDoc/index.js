import React, { Component, PropTypes } from 'react';

import styles from './jsonDoc.css';
import H2 from '../../../components/H2';
import ParameterList from '../ParameterList';
import * as utils from '../../../utils';

const numSpaces = 4;

const spaces = (indent) => Array(indent * numSpaces).join(' ');

// --    "name": "value",
/* eslint-disable max-len */
const FieldValue = ({ name, value, fullType, indent, mouseOver, click }) =>
  <a href={`#${fullType}`} className={styles.link} data-fullType={fullType} onMouseOver={mouseOver} onClick={click}>
    <span className={styles.name}>{spaces(indent)}"{name}"</span>: <span className={styles.value}>"{value}"</span>,{`\n`}
  </a>;
/* eslint-enable */

FieldValue.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  fullType: PropTypes.string.isRequired,
  indent: PropTypes.number.isRequired,
  mouseOver: PropTypes.func.isRequired,
  click: PropTypes.func.isRequired,
};

// --    "name":
const FieldEmpty = ({ name, fullType, indent, mouseOver }) =>
  <a href={`#${fullType}`} className={styles.link} data-fullType={fullType} onMouseOver={mouseOver}>
    <span className={styles.name}>{spaces(indent)}"{name}"</span>:
  </a>;

FieldEmpty.propTypes = {
  name: PropTypes.string.isRequired,
  fullType: PropTypes.string.isRequired,
  indent: PropTypes.number.isRequired,
  mouseOver: PropTypes.func.isRequired,
};

// --   "value",
const StringValue = ({ value, fullType, indent, mouseOver }) =>
  <a href={`#${fullType}`} className={styles.link} data-fullType={fullType} onMouseOver={mouseOver}>
    <span className={styles.name}>{spaces(indent)}"{value}"</span>{`\n`}
  </a>;

StringValue.propTypes = {
  value: PropTypes.string.isRequired,
  indent: PropTypes.number.isRequired,
  mouseOver: PropTypes.func.isRequired,
  fullType: PropTypes.string,
};

const ArrayValue = ({ name, fullType, indent, mouseOver }) =>
  <div>
    <FieldEmpty name={name} fullType={fullType} indent={indent} mouseOver={mouseOver} /> {'[\n'}
    <StringValue value={name} fullType={fullType} indent={indent + 1} mouseOver={mouseOver} />
    {`${spaces(indent)}],`}
  </div>;

ArrayValue.propTypes = {
  name: PropTypes.string.isRequired,
  fullType: PropTypes.string.isRequired,
  indent: PropTypes.number.isRequired,
  mouseOver: PropTypes.func.isRequired,
};

const renderModel = (key, name, type, fullType, spec, indent, mouseOver) => {
  let open = '{';
  let close = '}';
  if (utils.isArray(type)) {
    open = '[{';
    close = '}]';
  } else if (utils.isEnum(type, spec)) {
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
      indent={indent}
      mouseOver={mouseOver}
      open={open}
      close={close}
    />
  );
};

const ModelInner = ({ type, fullType, spec, indent, mouseOver }) => {
  if (utils.isEnum(type, spec)) {
    // Enum Value
    const enumModel = utils.getEnum(type, spec);
    return (
      <StringValue value={enumModel.values[0].name} fullType={fullType} indent={indent + 1} mouseOver={mouseOver} />
    );
  } else {
    // Model, Array, Field
    return (
      <div>
        {utils.getModel(type, spec).fields.map((field, id) => {
          const example = utils.isISODateTime(field.type) ?
                           new Date('2016-03-24T13:56:45.242Z').toISOString() : field.example;
          const value = utils.isEnum(field.type, spec) ?
                         utils.getEnumExampleValue(utils.getEnum(field.type, spec)) :
                         example;
          if (utils.isModel(field.type, spec)) {
            return renderModel(id, field.name, field.type, `${type}.${field.name}`, spec, indent + 1, mouseOver);
          } else if (utils.isArray(field.type)) {
            return (
              <ArrayValue
                key={id}
                name={field.name}
                value={value}
                fullType={`${type}.${field.name}`}
                indent={indent + 1}
                mouseOver={mouseOver}
              />);
          } else {
            return (
              <FieldValue
                key={id}
                name={field.name}
                value={value}
                fullType={`${type}.${field.name}`}
                indent={indent + 1}
                mouseOver={mouseOver}
                click={utils.onClickHref(
                  `${location.pathname.substring(0, location.pathname.lastIndexOf('/'))}/${type}`
                )}
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
  indent: PropTypes.number.isRequired,
  mouseOver: PropTypes.func.isRequired,
};

const Model = ({ name, type, fullType, spec, indent, mouseOver, open, close }) =>
  <div>
    <FieldEmpty name={name} fullType={fullType} indent={indent} mouseOver={mouseOver} /> {open}
    <ModelInner type={utils.getType(type)} fullType={fullType} spec={spec} indent={indent} mouseOver={mouseOver} />
    {`${spaces(indent)}${close},`}
  </div>;

Model.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  fullType: PropTypes.string.isRequired,
  spec: PropTypes.object.isRequired,
  indent: PropTypes.number.isRequired,
  mouseOver: PropTypes.func.isRequired,
  open: PropTypes.string.isRequired,
  close: PropTypes.string.isRequired,
};


const Documentation = ({ field }) =>
  <div className={styles.documentation}>
    <ParameterList {...field} />
  </div>;

Documentation.propTypes = {
  field: PropTypes.object.isRequired,
};

// TODO
// Support for markdown descriptions
class JsonDoc extends Component {
  constructor(props) {
    super(props);
    this.state = { documentationFullType: '' };

    this.mouseOver = (event) => {
      const documentationFullType = event.currentTarget.dataset.fulltype;
      this.setState({ documentationFullType });
    };
  }

  getDocumentation(documentationFullType, spec) {
    if (!documentationFullType) return '';

    const [modelName, fieldName] = documentationFullType.split('.');
    const model = utils.getModel(modelName, spec);
    const field = model.fields.find(f => f.name === fieldName);

    return <Documentation field={field} />;
  }

  getModel(baseModel, spec, includeModel) {
    const docs = () => {
      const model = utils.getModel(baseModel, spec);
      return (
        <div>
          <H2 className={styles.modelName}>{baseModel}</H2>
          <p className={styles.modelDescription}>{model.description}</p>
        </div>
      );
    };
    return includeModel ? docs() : null;
  }

  render() {
    const { baseModel, spec, includeModel } = this.props;
    return (
      <div className={styles.jsonDoc}>
        {this.getModel(baseModel, spec, includeModel)}
        <div className={styles.container}>
          <pre className={styles.code}>
          {'{'}
            <ModelInner
              type={baseModel}
              spec={spec}
              indent={0}
              mouseOver={this.mouseOver}
            />
          {'}'}
          </pre>
          {this.getDocumentation(this.state.documentationFullType, spec)}
        </div>
      </div>
    );
  }
}
JsonDoc.propTypes = {
  spec: PropTypes.object.isRequired,
  baseModel: PropTypes.string.isRequired,
  includeModel: PropTypes.bool, // Include Model Documentation in JsonDoc
};

export default JsonDoc;

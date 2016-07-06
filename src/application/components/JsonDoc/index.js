import React, { Component, PropTypes } from 'react';

import Documenation from './Documentation';
import { NameValue, Name, Value } from './Fields';
import ModelDescription from './ModelDescription';

import * as utils from '../../../utils';

import styles from './json-doc.css';

const numSpaces = 4;
const spaces = (indent) => new Array(indent * numSpaces).join(' ');

const ModelInner = ({ type, fullType, spec, imports, indent, mouseOver }) => {
  if (utils.isEnum(type, spec, imports)) {
    // Enum Value
    const enumModel = utils.getEnum(type, spec, imports);

    return (
      <Value
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

          const click = (modelType) => utils.onClickHref(utils.buildNavHref({
            organization: spec.organization.key,
            application: spec.application.key,
            model: utils.getType(modelType),
          }));


          if (utils.isModel(field.type, spec, imports)) {
            return (
              <div key={id}>
                <Name
                  name={field.name}
                  fullType={fullType}
                  indent={indent + 1}
                  mouseOver={mouseOver}
                  click={click(type)}
                />
                <Model
                  name={field.name}
                  type={field.type}
                  fullType={fullType}
                  spec={spec}
                  imports={imports}
                  indent={indent + 2}
                  mouseOver={mouseOver}
                  click={click(model.name)}
                />
              </div>
          );
          } else if (utils.isArray(field.type)) {
            return (
              <div key={id}>
                <Name
                  name={field.name}
                  fullType={fullType}
                  indent={indent}
                  mouseOver={mouseOver}
                  click={click(field.name)}
                />
                {'[\n'}
                <Value
                  value={formattedValue}
                  fullType={fullType}
                  indent={indent + 1}
                  mouseOver={mouseOver}
                  click={click(model.name)}
                />
                {`${spaces(indent)}],`}
              </div>);
          } else {
            return (
              <NameValue
                key={id}
                name={field.name}
                value={formattedValue}
                fullType={`${utils.getType(type)}.${field.name}`}
                indent={indent + 1}
                mouseOver={mouseOver}
                click={click(type)}
              />);
          }
        })}
      </div>
    );
  }
};

ModelInner.propTypes = {
  type: PropTypes.string.isRequired,
  fullType: PropTypes.string.isRequired,
  spec: PropTypes.object.isRequired,
  imports: PropTypes.array.isRequired,
  indent: PropTypes.number.isRequired,
  mouseOver: PropTypes.func.isRequired,
};

const Model = ({ name, type, fullType, spec, imports, indent, mouseOver, click }) => {
  const onClick = (modelType) => utils.onClickHref(utils.buildNavHref({
    organization: spec.organization.key,
    application: spec.application.key,
    model: utils.getType(modelType),
  }));
    // <div className={styles.model} onClick={onClick(name)} onMouseOver={mouseOver}>
  return (
    <div className={styles.model}>
      {`${spaces(indent)}{`}
      <ModelInner
        type={utils.getType(type)}
        fullType={fullType}
        spec={spec}
        imports={imports}
        indent={indent}
        mouseOver={mouseOver}
      />
      {`${spaces(indent)}},`}
    </div>);
};

Model.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  fullType: PropTypes.string.isRequired,
  spec: PropTypes.object.isRequired,
  imports: PropTypes.array.isRequired,
  indent: PropTypes.number.isRequired,
  mouseOver: PropTypes.func.isRequired,
  click: PropTypes.func.isRequired,
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

  getModelInnerJson(baseModel, spec, imports, mouseOver) {
    if (utils.isImportOrInSpec(baseModel, spec, imports)) {
      const start = utils.isArray(baseModel) ? '[{' : '{';
      const end = utils.isArray(baseModel) ? '}]' : '}';
      return (
        <div>
          {start}
          <ModelInner
            type={baseModel}
            fullType={"test"}
            spec={spec}
            imports={imports}
            indent={0}
            mouseOver={this.mouseOver}
          />
          {end}
        </div>
      );
    } else {
      return null;
    }
  }

  getJson(baseModel, spec, imports, modelInnerJson) {
    if (modelInnerJson) {
      return (
        <pre className={styles.code}>
          {modelInnerJson}
        </pre>
      );
    } else {
      return null;
    }
  }

  render() {
    const { baseModel, spec, imports, includeModel } = this.props;

    return (
      <div className={styles.jsonDoc}>
        {includeModel ? <ModelDescription
          baseModel={baseModel}
          spec={spec}
          imports={imports}
          modelNameClick={this.props.modelNameClick}
        /> : null}
        <div className={styles.container}>
          {this.getJson(baseModel, spec, imports,
                        this.props.rawValue ?
                        this.props.rawValue :
                        this.getModelInnerJson(baseModel, spec, imports, this.mouseOver))}
          <Documenation
            documentationFullType={this.state.documentationFullType}
            spec={spec}
            imports={imports}
          />
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
  rawValue: PropTypes.string,
};

export default JsonDoc;

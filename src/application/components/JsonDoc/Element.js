import React, { PropTypes } from 'react';

import * as utils from '../../../utils';
import * as defaults from './defaults';

import styles from './json-doc.css';

const numSpaces = 2;
const spaces = (indent) => new Array(indent * numSpaces + 1).join(' ');

/**
 Fields - the lines with "name: ..." eg:
   ...
   "name": "value",
   ...
   "name":
   ...

 Elements - the lines without labels - they just have values, eg array contents or a model. eg:
    ...
    [
      "value",
    ]
    ...
    {
      "value",
    }
    ...

 Load 'test-jsondoc-spec.json' into apidoc for testing all the permutations.
 It should look like 'test-jsondoc-spec-expected.js'.
*/

const click = (fieldKey, spec) => utils.onClickHref(utils.buildNavHref({
  organization: spec.organization.key,
  application: spec.application.key,
  model: fieldKey.split('.')[0],
  field: fieldKey,
}));

const FieldClickable = ({ fieldKey, mouseOver, onClick, children }) =>
  <div className={styles.field} href={`#${fieldKey}`} data-fieldKey={fieldKey} onMouseOver={mouseOver} onClick={onClick}>
    {children}
  </div>;

FieldClickable.propTypes = {
  fieldKey: PropTypes.string.isRequired,
  mouseOver: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const ElementClickable = ({ fieldKey, mouseOver, onClick, children }) =>
  <div className={styles.element} href={`#${fieldKey}`} data-fieldKey={fieldKey} onMouseOver={mouseOver} onClick={onClick}>
    {children}
  </div>;

ElementClickable.propTypes = {
  fieldKey: PropTypes.string.isRequired,
  mouseOver: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const SingleLineField = ({ label, value, fieldKey, indent, mouseOver, onClick }) =>
  <FieldClickable fieldKey={fieldKey} mouseOver={mouseOver} onClick={onClick}>
    <span className={styles.name}>{spaces(indent)}"{label}":</span>
    <span className={styles.value}> {value},</span>
  </FieldClickable>

SingleLineField.propTypes = {
  label: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
  fieldKey: PropTypes.string.isRequired,
  indent: PropTypes.number.isRequired,
  mouseOver: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

const MultiLineField = ({ label, fieldKey, indent, mouseOver, onClick, children }) =>
  <div>
    <FieldClickable fieldKey={fieldKey} mouseOver={mouseOver} onClick={onClick}>
      <span className={styles.name}>{spaces(indent)}"{label}":</span>
    </FieldClickable>
    <ElementClickable fieldKey={fieldKey} mouseOver={mouseOver} onClick={onClick}>
      {children}
    </ElementClickable>
  </div>;

MultiLineField.propTypes = {
  label: PropTypes.node.isRequired,
  fieldKey: PropTypes.string.isRequired,
  indent: PropTypes.number.isRequired,
  mouseOver: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const SimpleElement = ({ value, fieldKey, indent, mouseOver, onClick }) =>
  <FieldClickable fieldKey={fieldKey} mouseOver={mouseOver} onClick={onClick}>
    <span className={styles.value}>{spaces(indent)}{value}</span>,
  </FieldClickable>;

SimpleElement.propTypes = {
  value: PropTypes.string.isRequired,
  fieldKey: PropTypes.string.isRequired,
  indent: PropTypes.number.isRequired,
  mouseOver: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

const ArrayElement = ({ fieldKey, indent, mouseOver, onClick, children }) => {
  const indented = React.cloneElement(children, { indent: children.props.indent + 1 });
  return (
    <div>
      {`${spaces(indent)}[`}
      {indented}
      {`${spaces(indent)}],`}
    </div>
  );
};

ArrayElement.propTypes = {
  fieldKey: PropTypes.string.isRequired,
  indent: PropTypes.number.isRequired,
  mouseOver: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const ModelElement = ({ model, fieldKey, indent, mouseOver, spec, imports }) =>
  <div>
    {`${spaces(indent)}{`}
    {model.fields.map((field, id) =>
      <Field
        key={id}
        field={field}
        fieldKey={`${model.name}.${field.name}`}
        indent={indent + 1}
        mouseOver={mouseOver}
        spec={spec}
        imports={imports}
      />
    )}
    {`${spaces(indent)}},`}
  </div>;

ModelElement.propTypes = {
  model: PropTypes.object.isRequired,
  fieldKey: PropTypes.string.isRequired,
  indent: PropTypes.number.isRequired,
  mouseOver: PropTypes.func.isRequired,
  spec: PropTypes.object.isRequired,
  imports: PropTypes.array.isRequired,
};

const Field = ({ field, fieldKey, indent, mouseOver, spec, imports }) => {
  const type = field.type;

  if (utils.isArray(type) || utils.isModel(type, spec, imports)) {
    return (
      <MultiLineField
        label={field.name}
        fieldKey={fieldKey}
        indent={indent}
        mouseOver={mouseOver}
        onClick={click(fieldKey, spec)}
      >
        <Element
          field={field}
          type={type}
          fieldKey={fieldKey}
          indent={indent}
          spec={spec}
          imports={imports}
          mouseOver={mouseOver}
        />
      </MultiLineField>
    );
  } else { // Standard Value or Enum
    let value = null;
    if (utils.isEnum(type, spec, imports)) {
      const enumModel = utils.getEnum(type, spec, imports);
      value = `"${enumModel.values[0].name}"`;
    } else {
      value = defaults.getFieldValue(field);
    }
    return (
      <SingleLineField
        label={field.name}
        value={value}
        fieldKey={fieldKey}
        indent={indent}
        mouseOver={mouseOver}
        onClick={click(fieldKey, spec)}
      />
    );
  }
};

Field.propTypes = {
  field: PropTypes.object.isRequired,
  fieldKey: PropTypes.string.isRequired,
  indent: PropTypes.number.isRequired,
  mouseOver: PropTypes.func.isRequired,
  spec: PropTypes.object.isRequired,
  imports: PropTypes.array.isRequired,
};

const Element = ({ field, type, fieldKey, indent, mouseOver, spec, imports }) => {
  let element = null;
  if (utils.isModel(type, spec, imports)) {
    const model = utils.getModel(type, spec, imports);
    element =
      (<ModelElement
        model={model}
        fieldKey={fieldKey}
        indent={indent}
        mouseOver={mouseOver}
        onClick={click(fieldKey, spec)}
        spec={spec}
        imports={imports}
      />);
  } else {
    let value = '""';
    if (field) {
      value = defaults.getFieldValue(field);
    }
    element =
      (<SimpleElement
        value={value}
        fieldKey={fieldKey}
        indent={indent}
        mouseOver={mouseOver}
        onClick={click(fieldKey, spec)}
        spec={spec}
        imports={imports}
      />);
  }

  if (utils.isArray(type)) {
    return (
      <ArrayElement
        fieldKey={fieldKey}
        indent={indent}
        mouseOver={mouseOver}
        onClick={click(fieldKey, spec)}
      >
        {element}
      </ArrayElement>
    );
  } else {
    return element;
  }
};

Element.propTypes = {
  field: PropTypes.object, // Optional - not used on first load
  type: PropTypes.string.isRequired,
  fieldKey: PropTypes.string.isRequired,
  indent: PropTypes.number.isRequired,
  mouseOver: PropTypes.func.isRequired,
  spec: PropTypes.object.isRequired,
  imports: PropTypes.array.isRequired,
};

export default Element;

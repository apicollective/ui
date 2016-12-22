// @flow
import React from 'react';

import * as utils from '../../../utils';
import * as defaults from './defaults';

import styles from './json-doc.css';
import type { Service, Model, Field } from '../../../generated/version/ServiceType';

const numSpaces = 2;
const spaces = (indent: number): string => new Array(indent * numSpaces + 1).join(' ');

/**
 JFields - the lines with "name: ..." eg:
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

const click = (fieldKey: string, service: Service) => utils.onClickHref(utils.buildNavHref({
  organization: service.organization.key,
  application: service.application.key,
  model: fieldKey.split('.')[0],
  field: fieldKey,
}));

const FieldClickable = ({ fieldKey, mouseOver, onClick, children } : {
  fieldKey: string,
  mouseOver: (event: SyntheticEvent) => void,
  onClick: () => void,
  children?: React$Element<*>
}) =>
  <div
    className={styles.field}
    href={`#${String(fieldKey)}`}
    data-fieldKey={fieldKey}
    onMouseOver={mouseOver}
    onClick={onClick}
  >
    {children}
  </div>;

const ElementClickable = ({ fieldKey, mouseOver, onClick, children }: {
  fieldKey: string,
  mouseOver: (event: SyntheticEvent) => void,
  onClick: () => void,
  children?: React$Element<*>
}) =>
  <div
    className={styles.element}
    href={`#${fieldKey}`}
    data-fieldKey={fieldKey}
    onMouseOver={mouseOver}
    onClick={onClick}
  >
    {children}
  </div>;

const SingleLineField = ({ label, value, fieldKey, indent, mouseOver, onClick }: {
  label: string,
  value: string,
  fieldKey: string,
  indent: number,
  mouseOver: (event: SyntheticEvent) => void,
  onClick: Function, // FIXME () => void,
}) =>
  <FieldClickable fieldKey={fieldKey} mouseOver={mouseOver} onClick={onClick}>
    <span className={styles.name}>{spaces(indent)}"{label}":</span>
    <span className={styles.value}> {value},</span>
  </FieldClickable>;

const MultiLineField = ({ label, fieldKey, indent, mouseOver, onClick, children }: {
  label: string,
  fieldKey: string,
  indent: number,
  mouseOver: (event: SyntheticEvent) => void,
  onClick: Function, // FIXME () => void,
  children?: React$Element<*>
}) =>
  <div>
    <FieldClickable fieldKey={fieldKey} mouseOver={mouseOver} onClick={onClick}>
      <span className={styles.name}>{spaces(indent)}"{label}":</span>
    </FieldClickable>
    <ElementClickable fieldKey={fieldKey} mouseOver={mouseOver} onClick={onClick}>
      {children}
    </ElementClickable>
  </div>;

const SimpleElement = ({ value, fieldKey, indent, mouseOver, onClick }: {
  value: string,
  fieldKey: string,
  indent: number,
  mouseOver: (event: SyntheticEvent) => void,
  onClick: Function, // FIXME () => void
}) =>
  <FieldClickable fieldKey={fieldKey} mouseOver={mouseOver} onClick={onClick}>
    <span className={styles.value}>{spaces(indent)}{value}</span>,
  </FieldClickable>;

const ArrayElement = ({ fieldKey, indent, mouseOver, onClick, children }: {
  fieldKey: string,
  indent: number,
  mouseOver: (event: SyntheticEvent) => void,
  onClick: Function, // FIXME () => void,
  children?: React$Element<*>
}) => {
  if (children === undefined) {
    return null;
  }
  const indented = React.cloneElement(children, { indent: children.props.indent + 1 });
  return (
    <div>
      {`${spaces(indent)}[`}
      {indented}
      {`${spaces(indent)}],`}
    </div>
  );
};

const ModelElement = ({ model, fieldKey, indent, mouseOver, service, importedServices }: {
  model: Model,
  fieldKey: string,
  indent: number,
  mouseOver: (event: SyntheticEvent) => void,
  service: Service,
  importedServices: Service[],
}) =>
  <div>
    {`${spaces(indent)}{`}
    {model.fields.map((field, id) =>
      <JField
        key={id}
        field={field}
        fieldKey={`${model.name}.${field.name}`}
        indent={indent + 1}
        mouseOver={mouseOver}
        service={service}
        importedServices={importedServices}
      />
    )}
    {`${spaces(indent)}},`}
  </div>;

const JField = ({ field, fieldKey, indent, mouseOver, service, importedServices }: {
  field: Field,
  fieldKey: string,
  indent: number,
  mouseOver: (event: SyntheticEvent) => void,
  service: Service,
  importedServices: Service[],
}) => {
  const type = field.type;

  if (utils.isArray(type) || utils.isModel(type, service, importedServices)) {
    return (
      <MultiLineField
        label={field.name}
        fieldKey={fieldKey}
        indent={indent}
        mouseOver={mouseOver}
        onClick={click(fieldKey, service)}
      >
        <Element
          field={field}
          type={type}
          fieldKey={fieldKey}
          indent={indent}
          service={service}
          importedServices={importedServices}
          mouseOver={mouseOver}
        />
      </MultiLineField>
    );
  } else { // Standard Value or Enum
    let value = null;
    if (utils.isEnum(type, service, importedServices)) {
      const enumModel = utils.getEnum(type, service, importedServices);
      value = enumModel ? `"${enumModel.values[0].name}"` : '';
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
        onClick={click(fieldKey, service)}
      />
    );
  }
};

const Element = ({ field, type, fieldKey, indent, mouseOver, service, importedServices }: {
  field?: Field,
  type: string,
  fieldKey: string,
  indent: number,
  mouseOver: (event: SyntheticEvent) => void,
  service: Service,
  importedServices: Service[],
}) => {
  let element = null;
  if (utils.isModel(type, service, importedServices)) {
    const model = utils.mustGetModel(type, service, importedServices); 
    element =
      (<ModelElement
        model={model}
        fieldKey={fieldKey}
        indent={indent}
        mouseOver={mouseOver}
        onClick={click(fieldKey, service)}
        service={service}
        importedServices={importedServices}
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
        onClick={click(fieldKey, service)}
        service={service}
        imports={importedServices}
      />);
  }

  if (utils.isArray(type)) {
    return (
      <ArrayElement
        fieldKey={fieldKey}
        indent={indent}
        mouseOver={mouseOver}
        onClick={click(fieldKey, service)}
      >
        {element}
      </ArrayElement>
    );
  } else {
    return element;
  }
};

export default Element;

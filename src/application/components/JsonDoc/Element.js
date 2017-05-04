// @flow
import React from 'react';
import { Link } from 'react-router-dom';

import * as utils from 'utils';
import * as defaults from 'application/components/JsonDoc/defaults';

import styles from 'application/components/JsonDoc/json-doc.css';
import type { Service, Model, Field } from 'generated/version/ServiceType';

const numSpaces = 2;
const spaces = (indent: number): string =>
  new Array(indent * numSpaces + 1).join(' ');

const comma = (isLast: boolean): string => (isLast ? '' : ',');

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

const click = (fieldKey: string, service: Service): string =>
  utils.buildNavHref({
    organization: service.organization.key,
    application: service.application.key,
    model: fieldKey.split('.')[0],
    field: fieldKey,
  });

const FieldClickable = (
  {
    fieldKey,
    mouseOver,
    children,
    toHref,
  }: {
    fieldKey: string,
    mouseOver: (event: SyntheticEvent) => void,
    children?: React$Element<*>,
    toHref: string,
  } = {}
) => (
  <div
    className={styles.field}
    href={`#${String(fieldKey)}`}
    data-fieldKey={fieldKey}
    onMouseOver={mouseOver}
  >
    <Link tabIndex={0} to={toHref}>
      {children}
    </Link>
  </div>
);

const ElementClickable = (
  {
    fieldKey,
    mouseOver,
    toHref,
    children,
  }: {
    fieldKey: string,
    mouseOver: (event: SyntheticEvent) => void,
    toHref: string,
    children?: React$Element<*>,
  } = {}
) => (
  <div
    className={styles.element}
    href={`#${fieldKey}`}
    data-lieldKey={fieldKey}
    onMouseOver={mouseOver}
  >
    <Link tabIndex={0} to={toHref}>
      {children}
    </Link>
  </div>
);

const SingleLineField = ({
  label,
  value,
  fieldKey,
  indent,
  mouseOver,
  toHref,
  isLast,
}: {
  label: string,
  value: string,
  fieldKey: string,
  indent: number,
  mouseOver: (event: SyntheticEvent) => void,
  toHref: string,
  isLast: boolean,
}) => (
  <FieldClickable fieldKey={fieldKey} mouseOver={mouseOver} toHref={toHref}>
    <span className={styles.name}>{spaces(indent)}"{label}":</span>
    <span className={styles.value}> {value}{comma(isLast)}</span>
  </FieldClickable>
);

const MultiLineField = (
  {
    label,
    fieldKey,
    indent,
    mouseOver,
    toHref,
    children,
  }: {
    label: string,
    fieldKey: string,
    indent: number,
    mouseOver: (event: SyntheticEvent) => void,
    toHref: string,
    children?: React$Element<*>,
  } = {}
) => (
  <div>
    <FieldClickable fieldKey={fieldKey} mouseOver={mouseOver} toHref={toHref}>
      <span className={styles.name}>{spaces(indent)}"{label}":</span>
    </FieldClickable>
    <ElementClickable fieldKey={fieldKey} mouseOver={mouseOver} toHref={toHref}>
      {children}
    </ElementClickable>
  </div>
);

const SimpleElement = ({
  value,
  fieldKey,
  indent,
  mouseOver,
  toHref,
  isLast,
}: {
  value: string,
  fieldKey: string,
  indent: number,
  mouseOver: (event: SyntheticEvent) => void,
  toHref: string,
  isLast: boolean,
}) => (
  <FieldClickable fieldKey={fieldKey} mouseOver={mouseOver} toHref={toHref}>
    <span className={styles.value}>{spaces(indent)}{value}</span>{comma(isLast)}
  </FieldClickable>
);

const ArrayElement = ({
  fieldKey,
  indent,
  mouseOver,
  toHref,
  children,
  isLast,
}: {
  fieldKey: string,
  indent: number,
  mouseOver: (event: SyntheticEvent) => void,
  toHref: string,
  children?: React$Element<*>,
  isLast: boolean,
}) => {
  if (children === undefined) {
    return null;
  }
  const indented = React.cloneElement(children, {
    indent: children.props.indent + 1,
  });
  return (
    <div>
      {`${spaces(indent)}[`}
      {indented}
      {`${spaces(indent)}]${comma(isLast)}`}
    </div>
  );
};

const ModelElement = ({
  model,
  fieldKey,
  indent,
  mouseOver,
  service,
  importedServices,
  isLast,
}: {
  model: ?Model,
  fieldKey: string,
  indent: number,
  mouseOver: (event: SyntheticEvent) => void,
  service: Service,
  importedServices: Service[],
  isLast: boolean,
}) => {
  if (model !== null && model !== undefined) {
    const name = model.name;
    const length = model.fields.length;
    return (
      <div>
        {`${spaces(indent)}{`}
        {model.fields.map((field, id) => (
          <JField
            key={field.name}
            field={field}
            fieldKey={`${name}.${field.name}`}
            indent={indent + 1}
            mouseOver={mouseOver}
            service={service}
            importedServices={importedServices}
            isLast={length === id + 1}
          />
        ))}
        {`${spaces(indent)}}${comma(isLast)}`}

      </div>
    );
  } else {
    return (
      <div>
        {`${spaces(indent)}{`}
        {`${spaces(indent)}}${comma(isLast)}`}
      </div>
    );
  }
};

export const JField = ({
  field,
  fieldKey,
  indent,
  mouseOver,
  service,
  importedServices,
  isLast,
}: {
  field: Field,
  fieldKey: string,
  indent: number,
  mouseOver: (event: SyntheticEvent) => void,
  service: Service,
  importedServices: Service[],
  isLast: boolean,
}) => {
  const type = field.type;

  if (utils.isArray(type) || utils.isModel(type, service, importedServices)) {
    return (
      <MultiLineField
        label={field.name}
        fieldKey={fieldKey}
        indent={indent}
        mouseOver={mouseOver}
        toHref={click(fieldKey, service)}
      >
        <Element
          field={field}
          type={type}
          fieldKey={fieldKey}
          indent={indent}
          service={service}
          importedServices={importedServices}
          mouseOver={mouseOver}
          isLast={isLast}
        />
      </MultiLineField>
    );
  } else {
    // Standard Value or Enum
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
        toHref={click(fieldKey, service)}
        isLast={isLast}
      />
    );
  }
};

const Element = ({
  field,
  type,
  fieldKey,
  indent,
  mouseOver,
  service,
  importedServices,
  isLast,
}: {
  field?: Field,
  type: string,
  fieldKey: string,
  indent: number,
  mouseOver: (event: SyntheticEvent) => void,
  service: Service,
  importedServices: Service[],
  isLast: boolean,
}) => {
  let element = null;
  const isArray = utils.isArray(type);
  if (utils.isModel(type, service, importedServices)) {
    const model = utils.getModel(type, service, importedServices);
    element = (
      <ModelElement
        model={model}
        fieldKey={fieldKey}
        indent={indent}
        mouseOver={mouseOver}
        toHref={click(fieldKey, service)}
        service={service}
        importedServices={importedServices}
        isLast={isArray || isLast}
      />
    );
  } else {
    let value = '""';
    if (field) {
      value = defaults.getFieldValue(field);
    }
    element = (
      <SimpleElement
        value={value}
        fieldKey={fieldKey}
        indent={indent}
        mouseOver={mouseOver}
        toHref={click(fieldKey, service)}
        service={service}
        importedServices={importedServices}
        isLast={isArray || isLast}
      />
    );
  }

  if (isArray) {
    return (
      <ArrayElement
        fieldKey={fieldKey}
        indent={indent}
        mouseOver={mouseOver}
        toHref={click(fieldKey, service)}
        isLast={isLast}
      >
        {element}
      </ArrayElement>
    );
  } else {
    return element;
  }
};

export default Element;

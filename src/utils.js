import { browserHistory } from 'react-router';

const cleanPath = (path) => path.replace(/\W/g, '');

const onClickHref = (href) => (event) => browserHistory.push(href);

const getType = (type) => {
  const ex = /[\[]?([^\]]+)/i;
  return type.match(ex)[1];
};

const simplifyName = (name) => {
  const splitName = name.split('.');
  const joined = splitName.map((word) =>
    word.search('v[0-9]+') > -1 ? word : word.substring(0, word.search('[A-Za-z]') + 1)
  ).join('.');
  return `${joined.substring(0, joined.lastIndexOf('.') - 1)}${splitName[splitName.length - 1]}`;
};

const findByName = (name, values) => values.find(v => v.name === getType(name));

const getEnumImport = (name, imports) => {
  const spec = imports.find(importValue => importValue.enums.find(e => e.name === getType(name)));
  return spec ? findByName(name, spec.enums) : null;
};

const getModelImport = (name, imports) => {
  const spec = imports.find(importValue => importValue.models.find(e => e.name === getType(name)));
  return spec ? findByName(name, spec.models) : null;
};
/* eslint-disable no-use-before-define */

const getEnum = (name, spec, imports) =>
          imports && isImport(name, imports) ? getEnumImport(name, imports) : findByName(name, spec.enums);

const getModel = (name, spec, imports) =>
          imports && isImport(name, imports) ? getModelImport(name, imports) : findByName(name, spec.models);

const isEnum = (type, spec, imports) => Boolean(getEnum(type, spec, imports));

const isModel = (type, spec, imports) => Boolean(getModel(type, spec, imports));

const isInSpec = (type, spec) => {
  const actualType = getType(type);
  return isModel(actualType, spec) || isEnum(actualType, spec);
};

const isImport = (type, imports) =>
        Boolean(imports.map((importValue) => isInSpec(type, importValue)).find(b => b === true));

/* eslint-enable no-use-before-define */

const isImportOrInSpec = (type, spec, imports) => isInSpec(type, spec) || isImport(type, imports);

const isArray = (type) => type.startsWith('[');

const getEnumExampleValue = (enumModel) => enumModel.values[0].name;

const isISODateTime = (type) => type === 'date-iso8601';

const getOperation = (type, method, path, spec) => {
  const resource = spec.resources.find(r => r.type === type);
  const operation = resource.operations.find((o) => (
        o.method.toLowerCase() === method && cleanPath(o.path) === path
    ));
  return operation;
};

const buildNavHref = ({ organization, application, resource, method, path, model } = {}) =>
  [].concat(organization ? `/org/${organization}` : null,
                    application ? `/app/${application}` : null,
                    resource ? `/r/${resource}` : null,
                    method ? `/m/${method}` : null,
                    path ? `/p/${path}` : null,
                    model ? `/m/${model}` : null).join('');

export {
  cleanPath,
  onClickHref,
  getType,
  simplifyName,
  getModel,
  isModel,
  getEnum,
  isEnum,
  isArray,
  isImport,
  isInSpec,
  isImportOrInSpec,
  getEnumExampleValue,
  isISODateTime,
  getOperation,
  buildNavHref,
};

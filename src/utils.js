import { browserHistory } from 'react-router';

const cleanPath = (path) => path.replace(/\W/g, '');

const onClickHref = (href) => (event) => browserHistory.push(href);

const getType = (type) => {
  const ex = /[\[]?([^\]]+)/i;
  return type.match(ex)[1];
};

const simplifyName = (name) => {
  const splitName = name.split('.');
  const joined = splitName.map((word) => word.search('[0-9]+') > -1 ? word : word[0]).join('.');
  return `${joined.substring(0, joined.lastIndexOf('.') - 1)}${splitName[splitName.length - 1]}`;
};

const getModel = (name, spec) => spec.models.find(m => m.name === getType(name));
const isModel = (type, spec) => Boolean(getModel(type, spec));

const getEnum = (type, spec) => spec.enums.find(e => e.name === type);
const isEnum = (type, spec) => Boolean(getEnum(type, spec));

const isArray = (type) => type.startsWith('[');

const isInSpec = (type, spec) => {
  const actualType = getType(type);
  return isModel(actualType, spec) || isEnum(actualType, spec);
};

const getEnumExampleValue = (enumModel) => enumModel.values[0].name;

const isISODateTime = (type) => type === 'date-iso8601';

const getOperation = (type, method, path, spec) => {
  const resource = spec.resources.find(r => r.type === type);
  const operation = resource.operations.find((o) => (
        o.method.toLowerCase() === method && cleanPath(o.path) === path
    ));
  return operation;
};

const buildNavHref = ({ organization, application, resource, method, path, model } = {}) => {
  const organizationString = organization ? `/org/${organization}` : '';
  const applicationString = application ? `/app/${application}` : '';
  const resourceString = resource ? `/r/${resource}` : '';
  const methodString = method ? `/m/${method}` : '';
  const pathString = path ? `/p/${path}` : '';
  const modelString = model ? `/m/${model}` : '';
  return `${organizationString}${applicationString}${resourceString}${methodString}${pathString}${modelString}`;
};

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
  isInSpec,
  getEnumExampleValue,
  isISODateTime,
  getOperation,
  buildNavHref,
};

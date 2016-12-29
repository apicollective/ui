// @flow
import { browserHistory } from 'react-router';

import type { Service, Operation, Method, Model, Enum } from './generated/version/ServiceType';

const cleanPath = (path: string) => path.replace(/\W/g, '');

const onClickHref = (href: string) => (event: Event) => {
  browserHistory.push(href);
  // Stop parent nav events to be publishes - jsondoc nesting
  if (event.stopPropagation) event.stopPropagation();
};

const getType = (type: string): string => {
  const ex = /[\[]?([^\]]+)/i;
  /* ex.a*/
  const result = type.match(ex);
  if (!result) {
    throw new Error('internal error: type should always exist');
  }
  return result[1];
};

const simplifyName = (name: string): string => {
  const splitName = name.split('.');
  const joined = splitName.map(word =>
    word.search('v[0-9]+') > -1 ? word : word.substring(0, word.search('[A-Za-z]') + 1)
  ).join('.');
  return `${joined.substring(0, joined.lastIndexOf('.') - 1)}${splitName[splitName.length - 1]}`;
};

// FIXME flow any object
const findByName = (name: string, values: any): ?Object => values.find(v => v.name === getType(name));

// FIXME flow any object
const mustFindByName = (name: string, values: any): Object => values.find(v => v.name === getType(name)) || {};

const getEnumImport = (name: string, importedServices: Service[]): ?Enum => {
  const service = importedServices.find(importValue => importValue.enums.find(e => e.name === getType(name)));
  return service ? findByName(name, service.enums) : null;
};

const getModelImport = (name: string, importedServices: Service[]): ?Model => {
  const service = importedServices.find(importValue => importValue.models.find(e => e.name === getType(name)));
  return service ? findByName(name, service.models) : null;
};

const mustGetModelImport = (name: string, importedServices: Service[]): Model => {
  const service = importedServices.find(importValue => importValue.models.find(e => e.name === getType(name)));
  if( service){ 
    return mustFindByName(name, service.models)
  } else {
    throw new Error('FIXME');
  }
};
/* eslint-disable no-use-before-define */

const getEnum = (name: string, service: Service, importedServices: Service[]): ?Enum =>
  importedServices && isImport(name, importedServices) ? getEnumImport(name, importedServices) : findByName(name, service.enums);

const getModel = (name: string, service: Service, importedServices: Service[]): ?Model =>
  importedServices && isImport(name, importedServices) ? getModelImport(name, importedServices) : findByName(name, service.models);

const mustGetModel = (name: string, service: Service, importedServices: Service[]): Model =>
  importedServices && isImport(name, importedServices) ? mustGetModelImport(name, importedServices) : mustFindByName(name, service.models); 

const isEnum = (type: string, service: Service, importedServices: Service[]): boolean =>
  Boolean(getEnum(type, service, importedServices));

const isModel = (type: string, service: Service, importedServices: Service[]): boolean =>
  Boolean(getModel(type, service, importedServices));

const isInService = (type: string, service: Service): boolean => {
  const actualType = getType(type);
  return isModel(actualType, service, []) || isEnum(actualType, service, []);
};

const isImport = (type: string, importedServices: Service[]): boolean =>
  Boolean(importedServices.map(importValue => isInService(type, importValue)).find(b => b === true));

/* eslint-enable no-use-before-define */

const isImportOrInService = (type: string, service: Service, importedServices: Service[]): boolean =>
  isInService(type, service) || isImport(type, importedServices);

const isArray = (type: string): boolean => type.startsWith('[');

const getEnumExampleValue = (enumModel: Enum[]): Enum => enumModel.values[0].name;

const isISODateTime = (type: string): boolean => type === 'date-iso8601';

const getOperation = (type: string, method: Method, path: string, service: Service): Operation => {
  const resource = service.resources.find(r => r.type === type);
  if (!resource) {
    throw new Error(`Resource not found: ${type}`);
  }
  const operation = resource.operations.find(o => (
        o.method.toLowerCase() === method && cleanPath(o.path) === path
    ));
  if (!operation) {
    throw new Error(`Operation not found: ${type}`);
  }

  return operation;
};

const buildNavHref = ({ organization, documentation, application, resource, method, path, model, field }: {
  organization?: string,
  documentation?: string,
  application?: string,
  resource?: string,
  method?: string,
  path?: string,
  model?: string,
  field?: string,
}) =>
  [].concat(
    organization ? `/org/${organization}` : null,
    documentation ? `/doc/${documentation}` : null,
    application ? `/app/${application}` : null,
    resource ? `/r/${resource}` : null,
    method ? `/m/${method}` : null,
    path ? `/p/${path}` : null,
    model ? `/m/${model}` : null,
    field ? `#${field}` : null,
  ).join('');

export {
  cleanPath,
  onClickHref,
  getType,
  simplifyName,
  getModel,
  mustGetModel,
  isModel,
  getEnum,
  isEnum,
  isArray,
  isImport,
  isInService,
  isImportOrInService,
  getEnumExampleValue,
  isISODateTime,
  getOperation,
  buildNavHref,
};

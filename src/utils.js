// @flow
import React from 'react';
import { Link as ReactLink } from 'react-router-dom';
import type {
  Service,
  Operation,
  Resource,
  Method,
  Model,
  Enum,
} from 'generated/version/ServiceType';

const cleanPath = (path: string) => path.replace(/\W/g, '');

const getType = (type: string): string => {
  /* const ex = /[\[]?([^\]]+)/i;*/
  const ex = /[[]?([^\]]+)/i;
  const result = type.match(ex);
  if (!result) {
    throw new Error('internal error: type should always exist');
  }
  return result[1];
};

const simplifyName = (name: string): string => {
  const splitName = name.split('.');
  const joined = splitName
    .map(
      word =>
        (word.search('v[0-9]+') > -1
          ? word
          : word.substring(0, word.search('[A-Za-z]') + 1))
    )
    .join('.');
  return `${joined.substring(0, joined.lastIndexOf('.') - 1)}${splitName[splitName.length - 1]}`;
};

interface Named {
  name: string,
}

function findByName<T: Named>(name: string, values: T[]): ?T {
  return values.find(v => v.name === getType(name));
}

const getEnumImport = (name: string, importedServices: Service[]): ?Enum => {
  const service = importedServices.find(importValue =>
    importValue.enums.find(e => e.name === getType(name))
  );
  return service ? findByName(name, service.enums) : null;
};

const getModelImport = (name: string, importedServices: Service[]): ?Model => {
  const service = importedServices.find(importValue =>
    importValue.models.find(e => e.name === getType(name))
  );
  return service ? findByName(name, service.models) : null;
};

const getEnum = (
  name: string,
  service: Service,
  importedServices: Service[]
): ?Enum =>
  (importedServices && isImport(name, importedServices)
    ? getEnumImport(name, importedServices)
    : findByName(name, service.enums));

const getModel = (
  name: string,
  service: Service,
  importedServices: Service[]
): ?Model =>
  (importedServices && isImport(name, importedServices)
    ? getModelImport(name, importedServices)
    : findByName(name, service.models));

const isEnum = (
  type: string,
  service: Service,
  importedServices: Service[]
): boolean => Boolean(getEnum(type, service, importedServices));

const isModel = (
  type: string,
  service: Service,
  importedServices: Service[]
): boolean => Boolean(getModel(type, service, importedServices));

const isInService = (type: string, service: Service): boolean => {
  const actualType = getType(type);
  return isModel(actualType, service, []) || isEnum(actualType, service, []);
};

const isImport = (type: string, importedServices: Service[]): boolean =>
  Boolean(
    importedServices
      .map(importValue => isInService(type, importValue))
      .find(b => b === true)
  );

const isImportOrInService = (
  type: string,
  service: Service,
  importedServices: Service[]
): boolean => isInService(type, service) || isImport(type, importedServices);

const isArray = (type: string): boolean => type.startsWith('[');

const getEnumExampleValue = (enumModel: Enum[]): Enum =>
  enumModel.values[0].name;

const isISODateTime = (type: string): boolean => type === 'date-iso8601';

const getResource = (type: string, service: Service): Resource => {
  const resource = service.resources.find(r => r.type === type);
  if (!resource) {
    throw new Error(`Resource not found: ${type}`);
  }
  return resource;
};

const getOperation = (
  type: string,
  method: Method,
  path: string,
  service: Service
): Operation => {
  const resource = getResource(type, service);
  const operation = resource.operations.find(
    o => o.method.toLowerCase() === method && cleanPath(o.path) === path
  );
  if (!operation) {
    throw new Error(`Operation not found: ${type}`);
  }
  return operation;
};

const buildNavHref = ({
  organization,
  documentation,
  application,
  resource,
  method,
  path,
  model,
  field,
}: {
  organization?: string,
  documentation?: string,
  application?: string,
  resource?: string,
  method?: string,
  path?: string,
  model?: string,
  field?: string,
}) =>
  []
    .concat(
      organization ? `/org/${organization}` : null,
      documentation ? `/doc/${documentation}` : null,
      application ? `/app/${application}` : null,
      resource ? `/r/${resource}` : null,
      method ? `/m/${method}` : null,
      path ? `/p/${path}` : null,
      model ? `/m/${model}` : null,
      field ? `#${field}` : null
    )
    .join('');

declare type LinkProps = {
  to?: string,
  tabIndex?: number,
  className?: string,
  children?: React$Element<*>,
};

export const Link = (props: LinkProps) =>
  (props.to
    ? <ReactLink {...props}>{props.children}</ReactLink>
    : <div className={props.className}>{props.children}</div>);

export {
  cleanPath,
  getType,
  simplifyName,
  getModel,
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
  getResource,
};

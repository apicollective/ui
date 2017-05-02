// @flow
import * as utils from 'utils';
import type { Field } from 'generated/version/ServiceType';

const getFieldValue = (field: Field) => {
  const type = utils.getType(field.type);
  const wrap = value => {
    switch (type) {
      case 'string':
      case 'date-time-iso8601':
      case 'date-iso8601':
      case 'uuid':
        return `"${value}"`;
      default:
        return value;
    }
  };

  if (field.example) {
    return wrap(field.example);
  }
  if (field.default) {
    return wrap(field.default);
  }
  switch (type) {
    case 'boolean':
      return 'true';
    case 'string':
      return `"${field.name}"`;
    case 'integer':
    case 'long':
      return '12';
    case 'decimal':
    case 'double':
      return '10.12';
    case 'date-time-iso8601':
      return `"${new Date('2016-03-24T13:56:45.242Z').toISOString()}"`;
    case 'date-iso8601':
      return '"2016-03-24"';
    case 'uuid':
      return '"5ecf6502-e532-4738-aad5-7ac9701251dd"';
    default:
      return '';
  }
};

export { getFieldValue };

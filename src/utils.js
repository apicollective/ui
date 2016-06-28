import { browserHistory } from 'react-router';

const cleanPath = (path) => path.replace(/\W/g, '');

const onClickHref = (href) => (event) => browserHistory.push(href);

const getType = (type) => {
  const ex = /[\[]?([^\]]+)/i;
  return type.match(ex)[1];
};

const getModel = (name, spec) => spec.models.find(m => m.name === getType(name));
const isModel = (type, spec) => Boolean(getModel(type, spec));

const getEnum = (type, spec) => spec.enums.find(e => e.name === type);
const isEnum = (type, spec) => Boolean(getEnum(type, spec));

const isArray = (type) => type.startsWith('[');

const getEnumExampleValue = (enumModel) => enumModel.values[0].name;

const isISODateTime = (type) => type === 'date-iso8601';

export {
  cleanPath,
  onClickHref,
  getType,
  getModel,
  isModel,
  getEnum,
  isEnum,
  isArray,
  getEnumExampleValue,
  isISODateTime,
};

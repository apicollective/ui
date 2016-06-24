import { browserHistory } from 'react-router';

const cleanPath = (path) => path.replace(/\W/g, '');

const onClickHref = (href) => (event) => browserHistory.push(href);

export {
  cleanPath,
  onClickHref,
};

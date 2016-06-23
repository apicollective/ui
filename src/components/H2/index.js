import React, { PropTypes } from 'react';
import classnames from 'classnames';

import styles from './h2.css';

const H2 = ({ className, children }) =>
  <h2 className={classnames(className, styles.h2)}>
    {children}
  </h2>;

H2.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default H2;

export {
  styles,
};

import React, { PropTypes } from 'react';
import classnames from 'classnames';

import styles from 'components/H1/h1.css';

const H1 = ({ className, children }) => (
  <h1 className={classnames(className, styles.h1)}>
    {children}
  </h1>
);

H1.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default H1;

export { styles };

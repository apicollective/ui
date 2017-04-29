import React, { PropTypes } from 'react';
import classnames from 'classnames';

import styles from './h3.css';

const H3 = ({ className, children, click }) => (
  <h3
    onClick={click}
    className={classnames(className, styles.h3, click ? styles.pointer : null)}
  >
    {children}
  </h3>
);

H3.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  click: PropTypes.func,
};

export default H3;

export { styles };

import React, { PropTypes } from 'react';
import classnames from 'classnames';

import styles from 'components/H2/h2.css';

const H2 = ({ className, children, click }) => (
  <h2
    onClick={click}
    className={classnames(className, styles.h2, click ? styles.pointer : null)}
  >
    {children}
  </h2>
);

H2.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  click: PropTypes.func,
};

export default H2;

export { styles };

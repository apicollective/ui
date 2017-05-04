//@flow
import React, { Children } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import styles from 'components/H2/h2.css';

const H2 = ({
  className,
  children,
  toHref,
}: {
  className?: string,
  toHref?: string,
  children?: Children,
}) => (
  <Link to={toHref}>
    <h2 className={classnames(className, styles.h2)}>
      {children}
    </h2>
  </Link>
);

export default H2;

export { styles };

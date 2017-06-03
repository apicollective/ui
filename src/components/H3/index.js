//@flow
import React, { Children } from 'react';
import { Link } from 'utils';
import classnames from 'classnames';

import styles from 'components/H3/h3.css';

const H3 = ({
  className,
  children,
  toHref,
}: {
  className?: string,
  toHref?: string,
  children?: Children,
}) => (
  <Link to={toHref}>
    <h3 className={classnames(className, styles.h3)}>
      {children}
    </h3>
  </Link>
);

export default H3;

export { styles };

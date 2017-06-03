// @flow
import React, { Children } from 'react';
import classnames from 'classnames';

import styles from 'components/H1/h1.css';

const H1 = ({
  className,
  children,
}: {
  className?: string,
  children?: Children,
}) => (
  <h1 className={classnames(className, styles.h1)}>
    {children}
  </h1>
);

export default H1;

export { styles };

// @flow
import React, { Children } from 'react';

import { Link } from 'react-router-dom';

import styles from 'components/Button/button.css';
import classnames from 'classnames';

const Button = ({
  className,
  classNameInner,
  toHref,
  children,
  target,
}: {
  className?: string,
  classNameInner?: string,
  toHref: string,
  target?: any, //FIXME
  children?: Children, //FIXME
}) => (
  <div className={classnames(className, styles.button)}>
    <Link
      className={classnames(classNameInner, styles.buttonInner)}
      to={toHref}
    >
      {children}
    </Link>
  </div>
);

export default Button;

export { styles };

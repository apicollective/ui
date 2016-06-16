import React from 'react';
import styles from './button.css';
import classnames from 'classnames';

const Button = (props) => {
  return(
    <div className={classnames(props.className, styles.button)}>
      <button className={classnames(props.classNameInner, styles.buttonInner)}>{props.children}</button>
    </div>
  );
};

export default Button;

export {
  styles,
}

import React, { PropTypes } from 'react';
import styles from './button.css';
import classnames from 'classnames';

const Button = (props) => (
  <div className={classnames(props.className, styles.button)}>
    <button className={classnames(props.classNameInner, styles.buttonInner)}>{props.children}</button>
  </div>
);
Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  classNameInner: PropTypes.string,
};

export default Button;

export {
  styles,
};

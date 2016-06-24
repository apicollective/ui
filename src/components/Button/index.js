import React, { PropTypes } from 'react';
import styles from './button.css';
import classnames from 'classnames';

const Button = (props) =>
  <div className={classnames(props.className, styles.button)}>
    <button
      className={classnames(props.classNameInner, styles.buttonInner)}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  </div>;

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  classNameInner: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  target: PropTypes.string,
};

export default Button;

export {
  styles,
};

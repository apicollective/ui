import React, { PropTypes } from 'react';

import styles from './json-doc.css';

// FIXME - move
const numSpaces = 4;
const spaces = (indent) => new Array(indent * numSpaces).join(' ');

const Wrapper = ({ fullType, mouseOver, click, children }) =>
  <a href={`#${fullType}`} className={styles.link} data-fullType={fullType} onMouseOver={mouseOver} onClick={click}>
    {children}
  </a>;

Wrapper.propTypes = {
  fullType: PropTypes.string.isRequired,
  mouseOver: PropTypes.func.isRequired,
  click: PropTypes.func.isRequired,
};

const Field = (props) =>
  <Wrapper {...props}>
    <span className={styles.name}>{spaces(props.indent)}"{props.name}"</span>{props.children}
  </Wrapper>;

Field.propTypes = {
  ...Wrapper.propTypes,
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
};

// --    "name": "value",
const NameValue = (props) =>
  <Field {...props}>: <span className={styles.value}>{props.value}</span>,</Field>;

NameValue.propTypes = {
  ...Wrapper.propTypes,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};

// --    "name":
const Name = (props) =>
  <Field {...props} >:</Field>;

Name.propTypes = {
  ...Wrapper.propTypes,
  name: PropTypes.string.isRequired,
};

// --   "value",
const Value = (props) =>
  <Wrapper {...props}><span className={styles.name}>{spaces(props.indent)}"{props.value}"</span></Wrapper>;

Value.propTypes = {
  ...Wrapper.propTypes,
  value: PropTypes.string.isRequired,
};

export {
  NameValue,
  Value,
  Name,
};

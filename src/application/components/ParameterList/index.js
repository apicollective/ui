import React, { PropTypes } from 'react';
import ReactMarkdown from 'react-markdown';

import styles from './parameterList.css';

const ParameterList = ({ name, type, required, description, example, defaultValue }) => (
  <div className={styles.container}>
    <div className={styles.meta}>
      <p className={styles.name}>{name}</p>
      <p className={styles.type}>{type}</p>
      {required ? <p className={styles.required}>required</p> : null}
    </div>
    <div className={styles.info}>
      {description ? <ReactMarkdown source={description} className={styles.description} /> : null}
      {example ? <p className={styles.example}>Example: {example}</p> : null}
      {defaultValue ? <p className={styles.default}>Default: {defaultValue}</p> : null}
    </div>
  </div>
);

ParameterList.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  description: PropTypes.string,
  example: PropTypes.string,
  defaultValue: PropTypes.string,
};

export default ParameterList;

import React, { PropTypes } from 'react';

import styles from './content.css';

const Content = (props) =>
  <div className={styles.content}>
    {props.children}
  </div>;

Content.propTypes = {
  // spec: PropTypes.object.isRequired,
};

export default Content;

export {
  styles,
};

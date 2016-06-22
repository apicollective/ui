import React, { PropTypes } from 'react';

import styles from './content.css';

const Content = (props) =>
  <div className={styles.content}>
    {props.children}
  </div>;

Content.propTypes = {
  children: PropTypes.node,
};

export default Content;

export {
  styles,
};

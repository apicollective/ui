import React, { PropTypes } from 'react';

import styles from './content.css';
import JsonDoc from './../JsonDoc';

const Content = () => (
  <div className={styles.content}>
    Some more Content
    Content
    <JsonDoc />
  </div>
);

Content.propTypes = {
  // spec: PropTypes.object.isRequired,
};

export default Content;

export {
  styles,
};

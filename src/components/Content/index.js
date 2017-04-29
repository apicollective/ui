import React, { PropTypes } from 'react';

import styles from './content.css';

const Content = props => (
  <div className={styles.content}>
    <div className={styles.contentInner}>
      {props.children}
    </div>
  </div>
);

Content.propTypes = {
  children: PropTypes.node,
};

export default Content;

export { styles };

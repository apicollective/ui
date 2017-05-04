// @flow
import React, { Children } from 'react';

import styles from 'components/Content/content.css';

const Content = ({
  children,
}: {
  children?: Children,
}) => (
  <div className={styles.content}>
    <div className={styles.contentInner}>
      {children}
    </div>
  </div>
);

export default Content;

export { styles };

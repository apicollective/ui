import React from 'react';

import styles from './loading-overlay.css';

const LoadingOverlay = () =>
  <div className={styles.container}>
    <div className={styles.loader}>Loading</div>
  </div>;

export default LoadingOverlay;

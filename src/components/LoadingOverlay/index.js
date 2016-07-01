import React, { Component, PropTypes } from 'react';
import { Motion, spring } from 'react-motion';

import styles from './loading-overlay.css';

const LoadingOverlay = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loader}>Loading</div>
    </div>
  )
};

export default LoadingOverlay;
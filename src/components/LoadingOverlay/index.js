import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import styles from './loading-overlay.css';

const LoadingOverlay = () =>
  <ReactCSSTransitionGroup
          transitionName='_loading-overlay-transition'
          transitionAppear
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          transitionAppearTimeout={500}
          component={FirstChild}
          >
    <div className={styles.container}>
      <div className={styles.loader}>Loading</div>
    </div>
  </ReactCSSTransitionGroup>;

export default LoadingOverlay;

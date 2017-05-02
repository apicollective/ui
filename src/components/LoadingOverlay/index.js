import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';

import styles from 'components/LoadingOverlay/loading-overlay.css';

const LoadingOverlay = (
  {
    isLoaded,
    children,
  }: {
    isLoaded: boolean,
    children?: React$Element<*>,
  } = {}
) => {
  const loader = (
    <div className={styles.container}>
      <div className={styles.cssloadLoader}>
        <div className={classnames(styles.cssloadInner, styles.cssloadOne)} />
        <div className={classnames(styles.cssloadInner, styles.cssloadTwo)} />
        <div className={classnames(styles.cssloadInner, styles.cssloadThree)} />
      </div>
    </div>
  );
  return (
    <ReactCSSTransitionGroup
      transitionName={styles}
      transitionAppear={true}
      transitionEnterTimeout={200}
      transitionLeaveTimeout={200}
      transitionAppearTimeout={250}
    >
      {isLoaded ? <div>{children}</div> : loader}
    </ReactCSSTransitionGroup>
  );
};

export default LoadingOverlay;

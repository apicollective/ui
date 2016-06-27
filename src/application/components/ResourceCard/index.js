import React, { PropTypes } from 'react';
import classnames from 'classnames';

import styles from './resource-card.css';

const ResourceCard = ({method, path}) => {

  const methodClasses = classnames(styles[method.toLowerCase()], styles.method);

  return (
    <div className={styles.container}>
      <div className={styles.flex}>
        <div className={styles.left}>
          <div className={methodClasses}>
            {method}
          </div>
        </div>
        <div className={styles.right}>
          <pre className={styles.path}>{path}</pre>
        </div>
      </div>
    </div>
  )
};

ResourceCard.propTypes = {
  method: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default ResourceCard;

export {
  styles
}

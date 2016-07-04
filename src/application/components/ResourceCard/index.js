import React, { PropTypes } from 'react';
import classnames from 'classnames';

import styles from './resource-card.css';

const ResourceCard = ({ method, path, click }) => {
  const methodClasses = classnames(styles[method.toLowerCase()], styles.method);
  const containerClasses = classnames(styles.container, click ? styles.isClick : null);

  return (
    <div onClick={click} className={containerClasses}>
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
  );
};

ResourceCard.propTypes = {
  method: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  click: PropTypes.func,
};

export default ResourceCard;

export {
  styles,
};

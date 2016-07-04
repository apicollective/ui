import React, { PropTypes } from 'react';
import classnames from 'classnames';

import Markdown from '../../../components/Markdown';

import styles from './resource-card.css';

const ResourceCard = ({ method, path, click, description }) => {
  const methodClasses = classnames(
    styles.method,
    styles[method.toLowerCase()],
    description ? styles.isExpandedMethod : null
  );
  const containerClasses = classnames(
    styles.container,
    click ? styles.isClick : null
  );
  const pathClasses = classnames(
    styles.path,
    description ? styles.isExpandedPath : null
  );

  return (
    <div onClick={click} className={containerClasses}>
      <div className={styles.flex}>
        <div className={styles.left}>
          <div className={methodClasses}>
            {method}
          </div>
        </div>
        <div className={styles.right}>
          <pre className={pathClasses}>{path}</pre>
        </div>
      </div>
      {description
        ? <Markdown source={description} className={styles.description} />
        : null
      }
    </div>
  );
};

ResourceCard.propTypes = {
  method: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  click: PropTypes.func,
  description: PropTypes.string,
};

export default ResourceCard;

export {
  styles,
};

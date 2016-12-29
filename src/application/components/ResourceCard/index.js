// @flow
import React from 'react';
import classnames from 'classnames';

import Markdown from '../../../components/Markdown';

import styles from './resource-card.css';

const ResourceCard = ({ method, path, click, description }: {
  method: string,
  path: string,
  click?: Function,
  description?: string,
}) => {
  const methodClasses = classnames(
    styles.method,
    styles[method.toLowerCase()],
    description ? styles.isExpandedMethod : null,
  );
  const containerClasses = classnames(
    styles.container,
    click ? styles.isClick : null,
  );
  const pathClasses = classnames(
    styles.path,
    description ? styles.isExpandedPath : null,
  );

  return (
    <div className={containerClasses}>
      <a tabIndex="0" onClick={click}>
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
      </a>
    </div>
  );
};


export default ResourceCard;

export {
  styles,
};

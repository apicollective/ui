// @flow
import React from 'react';
import classnames from 'classnames';
import { Link } from 'utils';

import Markdown from 'components/Markdown';

import styles from 'application/components/resource-card.css';

const ResourceCard = (
  {
    method,
    path,
    toHref,
    description,
  }: {|
    method: string,
    path: string,
    toHref?: string,
    description?: string,
  |} = {}
) => {
  const methodClasses = classnames(
    styles.method,
    styles[method.toLowerCase()],
    description ? styles.isExpandedMethod : null
  );
  const containerClasses = classnames(
    styles.container,
    toHref ? styles.href : null
  );
  const pathClasses = classnames(
    styles.path,
    description ? styles.isExpandedPath : null
  );

  return (
    <div className={containerClasses}>
      <Link tabIndex={0} to={toHref}>
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
          : null}
      </Link>
    </div>
  );
};

export default ResourceCard;

export { styles };

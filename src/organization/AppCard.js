// @flow
import React from 'react';
import { Link } from 'utils';

import Markdown from 'components/Markdown';

import styles from 'organization/app-card.css';

const AppCard = (
  {
    name,
    description,
    link,
  }: {
    name: string,
    description?: string,
    link: string,
  } = {}
) => (
  <div className={styles.container}>
    <Link tabIndex="0" to={link}>
      <p className={styles.name}>{name}</p>
      <div className={styles.description}>
        {description
          ? <Markdown source={description} />
          : <p className={styles.noContent}>No description.</p>}
      </div>
    </Link>
  </div>
);

export default AppCard;

export { styles };

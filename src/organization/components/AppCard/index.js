// @flow
import React from 'react';

import Markdown from '../../../components/Markdown';
import { onClickHref } from '../../../utils';

import styles from './app-card.css';

const AppCard = ({ name, description, link }: {
  name: string,
  description?: string,
  link: string,
}) =>
  <div className={styles.container} onClick={onClickHref(link)}>
    <p className={styles.name}>{name}</p>
    <div className={styles.description}>
      {description ?
        <Markdown
          source={description}
        /> :
        <p className={styles.noContent}>No description.</p>
      }
    </div>
  </div>;

export default AppCard;

export {
  styles,
};

// @flow
import React from 'react';

import Markdown from '../../../components/Markdown';
import { onClickHref } from '../../../utils';

import styles from './home-card.css';

const HomeCard = ({ name, description, link }: {
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

export default HomeCard;

export {
  styles,
};

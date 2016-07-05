import React, { PropTypes } from 'react';

import Markdown from '../../../components/Markdown';

import { onClickHref } from '../../../utils';

import styles from './home-card.css';

const HomeCard = ({ name, description, link }) =>
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

HomeCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  link: PropTypes.string.isRequired,
};

export default HomeCard;

export {
  styles,
};

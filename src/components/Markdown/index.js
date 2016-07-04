import React, { PropTypes } from 'react';
import ReactMarkdown from 'react-markdown';
import classnames from 'classnames';

import styles from './markdown.css';

const Markdown = ({ source, className }) =>
  <div className={classnames(className, styles.container)}>
    <ReactMarkdown
      source={source}
      className={styles.markdown}
    />
  </div>;

Markdown.propTypes = {
  source: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Markdown;

export {
  styles,
};

//@flow
import React from 'react';
import ReactMarkdown from 'react-markdown';
import classnames from 'classnames';

import styles from 'components/Markdown/markdown.css';

const Markdown = ({
  source,
  className,
}: {
  source: string,
  className?: string,
}) => (
  <div className={classnames(className, styles.container)}>
    <ReactMarkdown source={source} className={styles.markdown} />
  </div>
);

export default Markdown;

export { styles };

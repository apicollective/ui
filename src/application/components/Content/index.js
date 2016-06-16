import React, { Component, PropTypes } from 'react';

import styles from './content.css';

class Content extends Component {

  render() {
    return (
        <div className={styles.content}>
          Some more Content
        </div>
    );
  }
}

Content.propTypes = {
  // spec: PropTypes.object.isRequired,
};

export default Content;

export {
  styles,
}

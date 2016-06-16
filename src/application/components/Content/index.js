import React, { Component, PropTypes } from 'react';

import styles from './content.css';
import JsonDoc from './JsonDoc'

class Content extends Component {

  render() {
    return (
        <div className={styles.content}>
          Some more Content
          Content
          <JsonDoc />
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

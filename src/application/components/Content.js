import React, { Component, PropTypes } from 'react';
import styles from './content.css';

// import styles from './navbar.css';

class Content extends Component {

  render() {
    return (
        <div className={styles.content}>
          Content
        </div>
    );
  }
}

Content.propTypes = {
  // spec: PropTypes.object.isRequired,
};

export default Content;

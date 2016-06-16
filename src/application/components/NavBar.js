import React, { PropTypes } from 'react';

import Button from './Button';
import styles from './navbar.css';




const NavBar = (props) =>  {
  return (
    <div className={styles.navbar}>
      {props.items.map(
        (item, id) => <Button key={id} className={styles.button}>{item.name}</Button>
      )}
    </div>
  );
}

NavBar.propTypes = {
  items: PropTypes.array.isRequired,
};

export default NavBar;

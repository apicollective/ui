import React, { PropTypes } from 'react';

import Button from '../Button';
import styles from './navbar.css';

const NavBar = ({ items }) =>
  <div className={styles.navbar}>
    {items.map(
      (item, id) => <Button key={id} className={styles.button}>{item.name}</Button>
    )}
  </div>;

NavBar.propTypes = {
  items: PropTypes.array.isRequired,
};

export default NavBar;

export {
  styles,
};

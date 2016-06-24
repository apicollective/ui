import React, { PropTypes } from 'react';

import Button from '../Button';
import styles from './navbar.css';

const NavBar = ({ items, onClick, homeData }) =>
  <div className={styles.navbar}>
    <a onClick={onClick} {...homeData}>Home</a>
    {items.map(
      (item, id) => <Button key={id} className={styles.button} onClick={onClick} data={item.data}>{item.name}</Button>
    )}
  </div>;

NavBar.propTypes = {
  items: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  homeData: PropTypes.object,
};

export default NavBar;

export {
  styles,
};

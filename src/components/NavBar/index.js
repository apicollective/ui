import React, { PropTypes } from 'react';

import Button from '../Button';
import styles from './navbar.css';

const NavBar = ({ items, homeOnClick }) =>
  <div className={styles.navbar}>
    <a className={styles.home} onClick={homeOnClick}>Movio</a>
    <div className={styles.breadcrumbs}>
      {items.map(
        (item, id) => <Button key={id} className={styles.button} onClick={item.onClick}>{item.name}</Button>,
      )}
    </div>
  </div>;

NavBar.propTypes = {
  items: PropTypes.array.isRequired,
  homeOnClick: PropTypes.func.isRequired,
};

export default NavBar;

export {
  styles,
};

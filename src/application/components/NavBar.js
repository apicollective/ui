import React, { PropTypes } from 'react';

import styles from './navbar.css';
import btnStyle from './button.css';


const Button = (props) => {
  const className = props.className ? `${props.className} ${btnStyle.button}` : styles.button;
  return(
    <a className={className}>{props.children}</a>
  );
}

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

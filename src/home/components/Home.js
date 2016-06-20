import React, { PropTypes } from 'react';

import NavBar from '../../components/NavBar';
import SideBar from '../../components/SideBar';

import styles from './home.css';

const menuItems = [
];

const sideItems = [
  {
    name: '',
    items: [
      {
        name: 'Organizations',
        items: [
          { name: 'Movio Cinema', href: '' },
          { name: 'Movio Media', href: '' },
          { name: 'Numero', href: '' },
        ],
      },
    ],
  },
];

const oranizations = {

};

const Organizations = ({ organizations }) => (
    <div>
    {organizations.map((section, id) => (
        <Section key={id} section={section} />
    ))}
    </div>
);

const Home = (props) => (
  <div>
    <NavBar items={menuItems} />
    <div className={styles.main}>
    <SideBar items={sideItems} />
      <h1>Organizations</h1>
      <Organizations />
    </div>
  </div>
);

Home.propTypes = {
  // service: PropTypes.object.isRequired,
  // description: PropTypes.string,
};

export default Home;

export {
  styles,
};

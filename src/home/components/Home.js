import React, { PropTypes } from 'react';
import { Link } from 'react-router'

import NavBar from '../../components/NavBar';
import SideBar from '../../components/SideBar';
import Content from '../../components/Content';

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

const organizations = [
  {name: 'Movio Cinema'},
  {name: 'Movio Media'},
  {name: 'Numero'},
];

const Org = ({organization}) => (
  <div>{organization.name}</div>
);

const Organizations = ({ organizations }) => (
  <div>
  {organizations.map((organization, id) => (
      <Org key={id} organization={organization}/>
  ))}
  </div>
);

const Home = (props) => (
  <div>
    <NavBar items={menuItems} />
    <div className={styles.main}>
      <SideBar items={sideItems} />
      <Content>
        <h1>Organizations</h1>
        <Organizations organizations={organizations}/>
        <Link to="/app">App</Link>
      </Content>
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

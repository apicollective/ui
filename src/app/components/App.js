import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import NavBar from '../../components/NavBar';
import SideBar from '../../components/SideBar';
import Content from '../../components/Content';
import { actionTypes as appActionTypes } from '../actions';

import styles from './app.css';

const onClick = (event) => {
  browserHistory.push(event.currentTarget.dataset.href);
};

const navHomeData = { 'data-href': '/' };

const App = (props) =>
  <div>
    <NavBar items={props.navBarItems} onClick={onClick} homeData={navHomeData} />
    <div className={styles.main}>
      <SideBar items={props.sideBarItems} onClick={onClick} />
      <Content>
        {props.children}
      </Content>
    </div>
  </div>;

App.propTypes = {
  children: PropTypes.object.isRequired,
  navBarItems: PropTypes.array.isRequired,
  sideBarItems: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => (
  {
    navBarItems: state.app.get(appActionTypes.updateNavBar),
    sideBarItems: state.app.get(appActionTypes.updateSideBar),
  }
);

export default connect(
  mapStateToProps
)(App);

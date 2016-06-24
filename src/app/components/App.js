import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import NavBar from '../../components/NavBar';
import SideBar from '../../components/SideBar';
import Content from '../../components/Content';
import { actionTypes as appActionTypes } from '../actions';
import { onClickHref } from '../../utils';

import styles from './app.css';

const App = (props) =>
  <div>
    <NavBar items={props.navBarItems} homeOnClick={onClickHref('/')} />
    <div className={styles.main}>
      <SideBar items={props.sideBarItems} />
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

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import NavBar from '../../components/NavBar';
import SideBar from '../../components/SideBar';
import Content from '../../components/Content';
import { actionTypes as appActionTypes } from '../actions';
import { onClickHref } from '../../utils';

import styles from './app.css';

class App extends Component {

  componentWillMount() {
    this.fireEvent();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params !== nextProps.params) {
      this.fireEvent(nextProps.params);
    }
  }

  fireEvent(params = this.props.params) {
    console.log(params);
  }

  render() {
    return (
      <div>
        <NavBar items={this.props.navBarItems} homeOnClick={onClickHref('/')} />
        <div className={styles.main}>
          <SideBar sections={this.props.sideBarItems} />
          <Content>
            {this.props.children}
          </Content>
        </div>
      </div>);
  }
}

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

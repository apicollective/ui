import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions as docActions } from '../../../generated/documentation';

import H1 from './../../../components/H1';
import LoadingOverlay from '../../../components/LoadingOverlay';

import styles from './documentation.css';

const allActions = Object.assign({}, docActions);

class Home extends Component {
  // TODO: Can I haz more orgs?
  componentDidMount() {
    this.props.actions.getOrganizations_get({ limit: 20, offset: 0 });
  }

  render() {
    if (!this.props.loaded) {
      return (
        <LoadingOverlay />
      );
    } else {
      return (
        <div className={styles.content}>
          <div className={styles.header}>
            <H1 className={styles.h1}>Organizations</H1>
          </div>
          <div className={styles.container}>
            <Organizations organizations={this.props.organizations} />
          </div>
        </div>
      );
    }
  }
}
Home.propTypes = {
  actions: PropTypes.object.isRequired,
  organizations: PropTypes.array.isRequired,
  loaded: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => (
  {
    organizations: state.app.get('organizations'),
    loaded: state.app.get('loaded'),
  }
);

const mapDispatchToProps = (dispatch) => (
  { actions: bindActionCreators(allActions, dispatch) }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export {
  styles,
};

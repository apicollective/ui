import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import H1 from './../../../components/H1';
import LoadingOverlay from '../../../components/LoadingOverlay';
import AppCard from '../AppCard';

import styles from './organization.css';
import { actions } from '../../sagas';

const App = ({ orgKey, application }) =>
  <AppCard
    name={application.name}
    description={application.description}
    link={`/org/${orgKey}/app/${application.key}`}
  />;

App.propTypes = {
  orgKey: PropTypes.string.isRequired,
  application: PropTypes.object.isRequired,
};

// Roll into Org FIXME
const Applications = ({ orgKey, applications }) =>
  <div>
  {applications.map((application, id) => (
    <div key={`${orgKey}-${id}`} className={styles.container}>
      <App key={id} orgKey={orgKey} application={application} />
    </div>
  ))}
  </div>;

Applications.propTypes = {
  orgKey: PropTypes.string.isRequired,
  applications: PropTypes.array.isRequired,
};

class Organization extends Component {
  componentDidMount() {
    const orgKey = this.props.params.organizationKey;
    this.props.actions.getOrganizationDetails_get({ orgKey });
  }

  render() {
    if (!this.props.loaded) {
      return (<LoadingOverlay />);
    } else {
      return (
        <div className={styles.content}>
          <div className={styles.header}>
            <H1 className={styles.h1}>{this.props.organization.name}</H1>
          </div>
          <div className={styles.container}>
            <Applications
              orgKey={this.props.params.organizationKey}
              applications={this.props.applications}
            />
          </div>
        </div>
      );
    }
  }
}
Organization.propTypes = {
  params: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  organization: PropTypes.object.isRequired,
  applications: PropTypes.array.isRequired,
  loaded: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => (
  {
    organization: state.organization.get('organization'),
    applications: state.organization.get('applications'),
    loaded: state.organization.get('loaded'),
  }
);

const mapDispatchToProps = (dispatch) => (
  { actions: bindActionCreators(actions, dispatch) }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Organization);

export {
  styles,
};

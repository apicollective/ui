// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import H1 from './../../../components/H1';
import LoadingOverlay from '../../../components/LoadingOverlay';
import AppCard from '../AppCard';

import styles from './organization.css';
import { actions } from '../../sagas';

import type { State } from '../../../app/reducers';
import type { Application, Organization as OrganizationType } from '../../../generated/version/ServiceType';

const App = ({ orgKey, application }: {
  orgKey: string,
  application: Application,
}) =>
  <AppCard
    name={application.name}
    description={application.description}
    link={`/org/${orgKey}/app/${application.key}`}
  />;

// Roll into Org FIXME
const Applications = ({ orgKey, applications }: {
  orgKey: string,
  applications: Application[],
}) =>
  <div>
    {applications.map((application, id) => (
      <div key={`${orgKey}-${id}`} className={styles.container}>
        <App key={id} orgKey={orgKey} application={application} />
      </div>
    ))}
  </div>;

type Props = {
  loaded: boolean,
  params: Object, // FIXME
  actions: Object, // FIXME
  organization: OrganizationType,
  applications: any, // FIXME PropTypes.array.isRequired,
}

class Organization extends Component {
  props: Props;

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

const mapStateToProps = (state: State) => (
  {
    organization: state.organization.organization,
    applications: state.organization.applications,
    loaded: state.organization.loaded,
  }
);

const mapDispatchToProps = dispatch => (
  { actions: bindActionCreators(actions, dispatch) }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Organization);

export {
  styles,
};

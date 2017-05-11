// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import H1 from 'components/H1';
import LoadingOverlay from 'components/LoadingOverlay';
import AppCard from 'organization/AppCard';

import styles from 'organization/organization.css';
import { actions } from 'organization/sagas';

import type { Match } from 'types';
import type { State } from 'app/reducers';
import type {
  Application,
  Organization as OrganizationType,
} from 'generated/version/ServiceType';

const App = ({
  orgKey,
  application,
}: {
  orgKey: string,
  application: Application,
}) => (
  <AppCard
    name={application.name}
    description={application.description}
    link={`/org/${orgKey}/app/${application.key}`}
  />
);

// Roll into Org FIXME
const Applications = ({
  orgKey,
  applications,
}: {
  orgKey: string,
  applications: Application[],
}) => (
  <div>
    {applications.map(application => (
      <div key={application.name} className={styles.container}>
        <App key={application.name} orgKey={orgKey} application={application} />
      </div>
    ))}
  </div>
);

type Params = {|
  name: string,
|};

type Props = {|
  loaded: boolean,
  match: Match<Params>,
  actions: Object, // FIXME
  organization?: OrganizationType,
  applications: any, // FIXME PropTypes.array.isRequired,
|};

class Organization extends Component {
  props: Props;

  componentDidMount() {
    const orgKey = this.props.match.params.organizationKey;
    this.props.actions.getOrganizationDetails_get({ orgKey });
  }

  render() {
    return (
      <LoadingOverlay isLoaded={this.props.loaded}>
        <div className={styles.content}>
          <div className={styles.header}>
            <H1 className={styles.h1}>
              {this.props.organization && this.props.organization.name}
            </H1>
          </div>
          <div className={styles.container}>
            <Applications
              orgKey={this.props.match.params.organizationKey}
              applications={this.props.applications}
            />
          </div>
        </div>
      </LoadingOverlay>
    );
  }
}

const mapStateToProps = (state: State) => ({
  organization: state.organization.organization,
  applications: state.organization.applications,
  loaded: state.organization.loaded,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Organization);

export { styles };

// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions as orgActions } from '../generated/organization';

import H1 from '../components/H1';
import LoadingOverlay from '../components/LoadingOverlay';
import HomeCard from './HomeCard';

import styles from './home.css';

import type { State } from '../app/reducers';
import type { Organization } from '../generated/version/ServiceType';

const allActions = Object.assign({}, orgActions);

const Org = ({ organization }: {
  organization: Organization,
}) =>
  <HomeCard
    link={`org/${organization.key}`}
    name={organization.name}
    description={organization.description}
  />;

const Organizations = ({ organizations }: {
  organizations: Organization[],
}) =>
  <div>
    {organizations.map(organization => (
      <div key={organization.key} className={styles.container}>
        <Org key={organization.key} organization={organization} />
      </div>
  ))}
  </div>;

type Props = {
  loaded: boolean,
  actions: Object, // FIXME - types
  organizations: Organization[],
}
class Home extends Component {
  props: Props;

  // TODO: Can I haz more orgs?
  componentDidMount() {
    this.props.actions.getOrganizations_get({ limit: 20, offset: 0 });
  }

  render() {
    return (
      <LoadingOverlay isLoaded={this.props.loaded}>
        <div className={styles.content}>
          <div className={styles.header}>
            <H1 className={styles.h1}>Organizations</H1>
          </div>
          <div className={styles.container}>
            <Organizations organizations={this.props.organizations} />
          </div>
        </div>
      </LoadingOverlay>
    );
  }
}

const mapStateToProps = (state: State) => ({ ...state.app });

const mapDispatchToProps = (dispatch): {[key: string]: Function} => (
  { actions: bindActionCreators(allActions, dispatch) }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

export {
  styles,
};

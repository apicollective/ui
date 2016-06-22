import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { actions as orgActions } from '../../generated/organization';

import styles from './home.css';

const allActions = Object.assign({}, orgActions);

const Org = ({ organization }) => (
  <Link to={`org/${organization.key}`}>{organization.name}</Link>
);
Org.propTypes = {
  organization: PropTypes.object.isRequired,
};

const Organizations = ({ organizations }) => (
  <div>
  {organizations.map((organization, id) => (
    <Org key={id} organization={organization} />
  ))}
  </div>
);
Organizations.propTypes = {
  organizations: PropTypes.array.isRequired,
};

class Home extends Component {
  componentDidMount() {
    this.props.actions.getOrganizations_get({ limit: 20, offset: 0 });
  }

  render() {
    return (
      <div>
        <h1>Organizations</h1>
        <Organizations organizations={this.props.organizations} />
      </div>
    );
  }
}
Home.propTypes = {
  organizations: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => (
  { organizations: state.app.get('organizations') }
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

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import styles from './organization.css';

import { actions } from '../sagas';


// Get from API
// const org = {
//   key: 'cinema',
//   name: 'Movio Cinema',
// };

// Get from API
// const applications = [
//   { name: 'Member Service', key: '1' },
//   { name: 'Cinema Service', key: '2' },
// ];

const App = ({ orgKey, application }) => (
  <Link to={`org/${orgKey}/app/${application.key}`}>{application.name}</Link>
);
App.propTypes = {
  orgKey: PropTypes.string.isRequired,
  application: PropTypes.object.isRequired,
};

// Roll into Org FIXME
const Applications = ({ orgKey, applications }) => (
  <div>
  {applications.map((application, id) => (
    <App key={id} orgKey={orgKey} application={application} />
  ))}
  </div>
);
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
    return (
      <div>
        <h1>{this.props.organization.name}</h1>
        <Applications orgKey={this.props.params.organizationKey} applications={this.props.applications} />
      </div>
    );
  }
}
Organization.propTypes = {
  organization: PropTypes.object.isRequired,
  applications: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => (
  {
    organization: state.organization.get('organization'),
    applications: state.organization.get('applications'),
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

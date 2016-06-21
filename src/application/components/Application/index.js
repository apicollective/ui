import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import JsonDoc from './../JsonDoc';

import styles from './application.css';

import { actions as specActions } from '../../../generated/version';
const allActions = Object.assign({}, specActions);


class Application extends Component {
  componentDidMount() {
    const orgKey = this.props.params.organizationKey;
    const applicationKey = this.props.params.applicationKey;
    this.props.actions.getByOrgkeyAndApplicationkeyAndVersion_get(
      { orgKey, applicationKey, version: 'latest' }
    );
  }

  render() {
    return (
      <div>
        Some more Content
        Content
        <JsonDoc spec={this.props.spec}/>
      </div>
    );
  }
};

Application.propTypes = {
  spec: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => (
  {
    spec: state.application.get('spec'),
  }
);

const mapDispatchToProps = (dispatch) => (
  { actions: bindActionCreators(allActions, dispatch) }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Application);

export {
  styles,
};

// const menuItems = [
//   { name: 'Movio Cinema', href: '' },
//   { name: 'Member Service', href: '' },
//   { name: 'Member', href: '' },
//   { name: 'POST /members', href: '' },
// ];

// const sideItems = [
//   {
//     name: 'Resources',
//     items: [
//       {
//         name: 'Generator',
//         items: [
//           { name: 'POST /member', href: '' },
//           { name: 'POST /members', href: '' },
//           { name: 'GET /member/:id', href: '' },
//         ],
//       },
//       {
//         name: 'Healthcheck',
//         items: [
//           { name: 'GET /', href: '' },
//         ],
//       },
//     ],
//   },
//   {
//     name: 'Models',
//     items: [
//       {
//         items: [
//           { name: 'Person - Model', href: '' },
//           { name: 'Address - Model', href: '' },
//           { name: 'Gender - Enum', href: '' },
//         ],
//       },
//     ],
//   },
// ];

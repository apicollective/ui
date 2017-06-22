// @flow
import React from 'react';
import { Redirect } from 'react-router';
import type { Location } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import queryString from 'query-string';

import { actions } from 'login/sagas';
import type { State } from 'login/reducers';

export type Session = {|
  id: string,
  expires_at: Date,
|};

type Props = {|
  loggingIn: boolean,
  session?: Session,
  actions?: typeof actions, // Not sure this is accurate
  location?: Location,
|};

/*
   - Goto github.com?...
   - Return to <host>/login?code=abc
   - Display loading
   - Backend call to validate token
   - Once validated
   -- update User, jwt
   -- redirect to home page
 */

const Login = (props: Props) => {
  if (!props.loggingIn) {
    return LoggingIn;
  }

  // If we have a valid JWT redirect to /
  if (props.session) {
    // TODO - valide JWT
    return <Redirect push={true} to="/" />;
  }

  // If we've returned from github with a token, validate it with the backend
  if (props.location) {
    const query = queryString.parse(props.location.search);
    if (query.code && props.actions) {
      props.actions.login(query.code);
      return <div>loading</div>;
    }
  }

  // Not logged in
  return LoginPlease;
};

const LoginPlease = () => <div>Login Failed</div>;

const LoggingIn = () => <div>Logging In</div>;

const mapStateToProps = (state: State): Props => ({
  loggingIn: state.loggingIn,
  session: state.session,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

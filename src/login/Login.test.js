// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import createHistory from 'history/createMemoryHistory';
import { configureStore } from 'store/configureStore';
import * as superagent from 'superagent';
import Login from 'login/Login';

export const history = createHistory({ initialEntries: ['/'] });
const store = configureStore(history);

test('Display "Please Login" if not logged in when on /login', () => {
  const props = {};

  const component = renderer.create(
    <Provider store={store}>
      <Router history={history}><Login {...props} /></Router>
    </Provider>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Validate github token with backend successfully and update the store', done => {
  superagent.__reset();
  const response = {
    body: {
      session: { id: 'session id' },
    },
  };
  superagent.__setMockResponse('/authenticate_github', response);

  const props = {
    location: {
      search: '?code=abc',
    },
  };

  const component = renderer.create(
    <Provider store={store}>
      <Router history={history}><Login {...props} /></Router>
    </Provider>
  );

  expect(component.toJSON()).toMatchSnapshot();

  // Confirm that after successfull backend validation we have session id stored in the store
  setTimeout(() => {
    const session = store.getState().login.session || {};
    expect(session.id).toBe('session id');
    done();
  }, 100);
});

test('After backend validation, should redirect back to home page', () => {
  history.push('/randompage');
  expect(history.location.pathname).toBe('/randompage');

  // Update store to have a valid session, simulating a successfull backend validation
  const props = { session: { id: 'ab' } };
  (store.getState(): Object).session = { id: 'valid session' };

  renderer.create(
    <Provider store={store}>
      <Router history={history}>
        <Login {...props} />
      </Router>
    </Provider>
  );

  // Confirm we get redirected from /login to home page
  expect(history.location.pathname).toBe('/');
});

// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { configureStore } from 'store/configureStore';
import * as superagent from 'superagent';

import Login from 'login/Login';

export const history = createHistory();
const store = configureStore(history);

test('Login Please', () => {
  const props = {};

  const component = renderer.create(
    <Provider store={store}>
      <MemoryRouter><Login {...props} /></MemoryRouter>
    </Provider>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Validate github token with backend successfully', done => {
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
      <MemoryRouter><Login {...props} /></MemoryRouter>
    </Provider>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  /* expect(component.toJSON()).toMatchSnapshot();*/

  setTimeout(() => {
    const session = store.getState().login.session || {};
    expect(session.id).toBe('session id');
    done();
  }, 100);
});

test('After backend validation, should redirect back to home page', () => {
  // FIXME
});

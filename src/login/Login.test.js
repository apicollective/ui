// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { configureStore } from 'store/configureStore';

import Login from 'login/Login';

export const history = createHistory();
const store = configureStore(history);

test('Login Loading', () => {
  const props = {
    location: {
      search: 'tst',
    },
  };

  const component = renderer.create(
    <Provider store={store}>
      <MemoryRouter><Login {...props} /></MemoryRouter>
    </Provider>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // expect api to be hit
  // store should have token
});

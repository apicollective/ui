// @flow
import { actions, actionTypes } from './actions';
import { reducers } from './reducers';

import Application from './components/Application';

const name = 'application';

export {
  name,
  actionTypes,
  actions,
  reducers,
  Application,
};

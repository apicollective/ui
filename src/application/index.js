import { actions, actionTypes } from './actions';
import { reducers } from './reducer';

export const name = 'application';

import Application from './components/Application';

export {
  name,
  actionTypes,
  actions,
  reducers,
  Application,
};

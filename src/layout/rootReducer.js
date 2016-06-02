import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { reducers as applicationReducers } from '../application';

const routing = { routing: routerReducer };

const allReducers = Object.assign(
  {},
  routing,
  applicationReducers
);

export default combineReducers(allReducers);


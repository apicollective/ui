import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { reducers as appReducers } from '../app';
import { reducers as applicationReducers } from '../application';
import { reducers as organizationReducers } from '../organization';

const routing = { routing: routerReducer };

const allReducers = Object.assign(
  {},
  routing,
  appReducers,
  applicationReducers,
  organizationReducers
);

export default combineReducers(allReducers);


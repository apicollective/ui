import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { reducers as appReducers } from '../app';
import { reducers as applicationReducers } from '../application';
import { reducers as organizationReducers } from '../organization';
import { reducers as documentationReducers } from '../documentation';

const routing = { routing: routerReducer };
const allReducers = Object.assign(
  {},
  routing,
  appReducers,
  applicationReducers,
  organizationReducers,
  documentationReducers,
);

export default combineReducers(allReducers);


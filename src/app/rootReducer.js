// @flow
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { reducers as appReducers } from 'app/reducers';
import { reducers as applicationReducers } from 'application/reducers';
import { reducers as organizationReducers } from 'organization/reducers';
import { reducers as documentationReducers } from 'documentation/reducers';

const routing = { routing: routerReducer };
const allReducers = Object.assign(
  {},
  routing,
  appReducers,
  applicationReducers,
  organizationReducers,
  documentationReducers
);

export default combineReducers(allReducers);

import { takeLatestSaga, actions, actionTypes } from './sagas';
import { reducers } from './reducers';

import Organization from './components/Organization';

const name = 'organization';

export {
  name,
  actionTypes,
  actions,
  takeLatestSaga,
  reducers,
  Organization,
};

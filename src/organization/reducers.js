import { Map } from 'immutable';

import { actionTypes } from './sagas';

const initialState = new Map({
  loaded: false,
  organization: {},
  applications: [],
});

const organization = (state = initialState, action) => {
  switch (action.type) {
    // Get Applications
    case actionTypes.getOrganizationDetails_success: {
      return state
        .set('organization', action.payload.organization)
        .set('applications', action.payload.applications)
        .set('loaded', true);
    }
    case actionTypes.getOrganizationDetails_doing: {
      return state
        .set('loaded', false);
    }
    default: {
      return state;
    }
  }
};

const reducers = {
  organization,
};

export {
  reducers,
};

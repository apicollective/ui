import { Map } from 'immutable';

import { actionTypes } from './sagas';

const initialState = new Map(
  {
    organization: {},
    applications: [],
  }
);

const organization = (state = initialState, action) => {
  switch (action.type) {
    // Get Applications
    case actionTypes.getOrganizationDetails_success: {
      return state
        .set('organization', action.payload.organization)
        .set('applications', action.payload.applications);
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

import { Map } from 'immutable';

import { actionTypes as orgActionTypes } from '../generated/organization';

const initialState = new Map({
    loaded: false,
    organizations: [],
  });

const app = (state = initialState, action) => {
  switch (action.type) {
    case orgActionTypes.getOrganizations_success: {
      return state
        .set('organizations', action.payload)
        .set('loaded', true);
    }
    case orgActionTypes.getOrganizations_doing: {
      console.log('app doing');
      return state.set('loaded', false);
    }
    default: {
      return state;
    }
  }
};

const reducers = {
  app,
};

export {
  reducers,
};

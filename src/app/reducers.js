import { Map } from 'immutable';

import { actionTypes as orgActionTypes } from '../generated/organization';

const initialState = new Map(
  {
    organizations: [],
  }
);

const app = (state = initialState, action) => {
  switch (action.type) {
    case orgActionTypes.getOrganizations_success: {
      return state.set('organizations', action.payload);
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

import { Map } from 'immutable';

import { actionTypes } from './actions';
import { actionTypes as orgActionTypes } from '../generated/organization';

const initialState = new Map(
  {
    [actionTypes.updateNavBar]: [],
    [actionTypes.updateSideBar]: [],
    organizations: [],
  }
);

const getSideBarModel = (payload) => (
  [{
    name: '',
    items: [
      {
        name: 'Organizations',
        items: payload.map((org) => (
          { name: org.name, href: `/org/${org.key}` }
        )),
      },
    ],
  }]
);

const app = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.updateNavBar: {
      return state.set(actionTypes.updateNavBar, action.payload);
    }
    case actionTypes.updateSideBar: {
      return state.set(actionTypes.updateSideBar, action.payload);
    }
    case orgActionTypes.getOrganizations_success: {
      return state
        .set(actionTypes.updateSideBar, getSideBarModel(action.payload))
        .set('organizations', action.payload);
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

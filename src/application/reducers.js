import { Map } from 'immutable';

import { actionTypes } from '../generated/version';

const initialState = new Map({
  loaded: false,
  spec: {
    enums: [],
    models: [
      {
        name: 'default',
        fields: [],
      },
    ],
  },
  imports: [{
    enums: [],
    models: [
      {
        name: 'default',
        fields: [],
      },
    ],
  }],
});

const application = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.getByOrgkeyAndApplicationkeyAndVersion_success: {
      return state
        .set('spec', action.payload.service)
        .set('imports', action.payload.imports)
        .set('loaded', true);
    }
    case actionTypes.getByOrgkeyAndApplicationkeyAndVersion_doing: {
      return state
        .set('loaded', false);
    }
    default: {
      return state;
    }
  }
};

const reducers = {
  application,
};

export {
  reducers,
};

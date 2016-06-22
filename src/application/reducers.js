import { Map } from 'immutable';

import { actionTypes } from '../generated/version';

const initialState = new Map({
  loaded: false,
  spec: {
    enums: [],
    models: [
      {
        'name': 'default',
        fields: [],
      },
    ],
  },
});

function application(state = initialState, action) {
  switch (action.type) {
    case actionTypes.getByOrgkeyAndApplicationkeyAndVersion_success: {
      return state
        .set('spec', action.payload)
        .set('loaded', true);
    }
    default: {
      return state;
    }
  }
}

const reducers = {
  application,
};

export {
  reducers,
};

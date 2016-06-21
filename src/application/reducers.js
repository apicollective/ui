import { Map } from 'immutable';

// import { actionTypes } from './actions';

const initialState = new Map({
  spec: {},
});

function application(state = initialState, action) {
  switch (action.type) {
    // case actionTypes.add: {
    //   return state.set(uuid(), {
    //     text: action.text,
    //     completed: false,
    //   });
    // }
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

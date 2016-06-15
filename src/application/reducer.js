import { OrderedMap } from 'immutable';

// import { actionTypes } from './actions';
// import * as applicationAp from '../generated/application/';

const initialState = new OrderedMap();

function first(state = initialState, action) {
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
  first,
};

export {
  reducers,
};

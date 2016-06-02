import { OrderedMap } from 'immutable';

import { actionTypes as t } from './constants';
// import * as applicationAp from '../generated/application/';

const initialState = new OrderedMap();

function first(state = initialState, action) {
  switch (action.type) {
    // case t.add: {
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
  first,
};

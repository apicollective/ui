import { Map } from 'immutable';

import { actionTypes } from '../generated/documentation/getByRootUrlAndMarkdownPath';

const initialState = new Map({
  loaded: false,
  markdown: '',
});

const documentation = (state = initialState, action) => {
  switch (action.type) {
    // Get documentation
    case actionTypes.getByRootUrlAndMarkdownPath_success: {
      return state
        .set('markdown', action.payload)
        .set('loaded', true);
    }
    case actionTypes.getByRootUrlAndMarkdownPath_doing: {
      return state
          .set('loaded', false);
    }
    case actionTypes.getByRootUrlAndMarkdownPath_failure: {
      return state
        .set('loaded', true);
    }
    default: {
      return state;
    }
  }
};

const reducers = {
  documentation,
};

export {
  reducers,
};

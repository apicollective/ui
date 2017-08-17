// @flow
import { actionTypes } from 'generated/documentation/getByRootUrlAndMarkdownPath';

export type State = {
  loaded: boolean,
  markdown?: string,
};

type Action = {|
  type: string,
  payload: any, // FIXME
|};

const initialState: State = {
  loaded: false,
};

const documentation = (state: State = initialState, action: Action) => {
  switch (action.type) {
    // Get documentation
    case actionTypes.getByRootUrlAndMarkdownPath_success: {
      return {
        markdown: action.payload,
        loaded: true,
      };
    }
    case actionTypes.getByRootUrlAndMarkdownPath_doing: {
      return {
        loaded: false,
        markdown: state.markdown,
      };
    }
    case actionTypes.getByRootUrlAndMarkdownPath_failure: {
      return {
        loaded: true,
        markdown: state.markdown,
      };
    }
    default: {
      return state;
    }
  }
};

const reducers = {
  documentation,
};

export { reducers };

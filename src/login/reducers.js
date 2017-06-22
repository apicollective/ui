// @flow
import type { Session } from 'login/Login';

export type State = {|
  +loggingIn: boolean,
  +session?: Session,
|};

export type LoginAction = {|
  +type: 'login/login',
  +payload: string,
|};
export type DoingAction = {|
  +type: 'login/doing',
|};
export type SuccessAction = {|
  +type: 'login/success',
  +payload: Session,
|};
export type FailureAction = {|
  +type: 'login/failure',
  +payload: Error,
|};
type Action = LoginAction | DoingAction | SuccessAction | FailureAction;

const initialState: State = { loggingIn: false };

const login = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'login/success': {
      return {
        loggingIn: false,
        session: action.payload,
      };
    }
    case 'login/doing': {
      return {
        loggingIn: true,
      };
    }
    case 'login/failure': {
      return {
        loggingIn: false,
      };
    }
    default: {
      return state;
    }
  }
};

const reducers = {
  login,
};

export { reducers };

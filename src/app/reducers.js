// @flow
import { actionTypes as orgActionTypes } from '../generated/organization';

import type { Organization } from '../generated/version/ServiceType';
import type { OrgState } from '../organization/reducers';
import type { State as DocumentationState } from '../documentation/reducers';

export type AppState = {|
  loaded: boolean,
  organizations: Organization[],
|};

export type State = {|
  app: AppState,
  organization: OrgState,
  application: any, // FIXME
  documentation: DocumentationState,
|};

type Action<T> = {|
  type: string,
  payload: T,
|};

type AppAction = Action<Organization[]>;

const initialState = {
  loaded: false,
  organizations: [],
};

const app = (state: AppState = initialState, action: AppAction) => {
  switch (action.type) {
    case orgActionTypes.getOrganizations_success: {
      return {
        loaded: true,
        organizations: action.payload,
      };
    }
    case orgActionTypes.getOrganizations_doing: {
      return Object.assign(state, {
        loaded: false,
      });
    }
    default: {
      return state;
    }
  }
};

const reducers = {
  app,
};

export { reducers };

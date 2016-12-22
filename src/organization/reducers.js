// @flow
import { actionTypes } from './sagas';

import type { Application, Organization } from '../generated/version/ServiceType';

export type OrgState = {
  loaded: boolean,
  organization?: Organization,
  applications: Application[],
}

export type OrgAction = {
  type: string,
  payload: {
    organization: Organization,
    applications: Application[],
  }
}

const initialState = {
  loaded: false,
  /* organization: {},*/
  applications: [],
};

const organization = (state: OrgState = initialState, action: OrgAction) => {
  switch (action.type) {
    // Get Applications
    case actionTypes.getOrganizationDetails_success: {
      return {
        loaded: true,
        organization: action.payload.organization,
        applications: action.payload.applications,
      };
    }
    case actionTypes.getOrganizationDetails_doing: {
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
  organization,
};

export {
  reducers,
};

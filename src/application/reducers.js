// @flow
/* import type { Service, Import } from '../generated/version/ServiceType';*/
import { actionTypes } from '../generated/version';

export type ApplicationState = {
  loaded: boolean,
  service: any, // FIXME Service,
  imports: any, // FIXME Import[],
}

type Action = {
  type: string,
  payload: any, // FIXME
}

const initialState = {
  loaded: false,
  service: {
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
};

const application = (state: ApplicationState = initialState, action: Action) => {
  switch (action.type) {
    case actionTypes.getByOrgkeyAndApplicationkeyAndVersion_success: {
      return {
        loaded: true,
        service: action.payload.service,
        imports: action.payload.import,
      };
    }
    case actionTypes.getByOrgkeyAndApplicationkeyAndVersion_doing: {
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
  application,
};

export {
  reducers,
};

import { takeLatest } from 'redux-saga';
import { put } from 'redux-saga/effects';

import { actions as appActions } from '../app';
import { actionTypes as specActionTypes } from '../generated/version/';
import { cleanPath } from '../utils';

const getSideNavModel = (spec) => {
  const orgKey = spec.organization.key;
  const appKey = spec.application.key;
  return [{
    name: 'Resources',
    items: spec.resources.map((resource) => (
      {
        name: resource.type,
        items: resource.operations.map((operation) => (
          {
            name: `${operation.method} ${operation.path}`,
            href: `/org/${orgKey}/app/${appKey}/r/${resource.type}/m/${operation.method.toLowerCase()}/p/${cleanPath(operation.path)}`,
          }
        )),
      }
    )),
  },
    {
      name: 'Models',
      items: [{
        name: '',
        items: spec.models.map((model) => (
        { name: `${model.name} - Model`, href: `${appKey}/model/${model.name}` }
      )).concat(
        spec.enums.map((enumValue) => (
          { name: `${enumValue.name} - Enum`, href: `${appKey}/model/${enumValue.name}` }
      ))),
      }],
    }];
};

function* saga(action) {
  const spec = action.payload;
  const sideBarItems = getSideNavModel(spec);
  yield put(appActions.updateSideNav(sideBarItems));
}

function* takeLatestSaga() {
  yield* takeLatest(specActionTypes.getByOrgkeyAndApplicationkeyAndVersion_success, saga);
}

export {
  saga,
  takeLatestSaga,
};

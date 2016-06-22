import { takeLatest } from 'redux-saga';
import { put } from 'redux-saga/effects';

import { actions as appActions } from '../app';
import { actionTypes as specActionTypes } from '../generated/version/';
import { cleanPath } from '../utils';

const getSideBarModel = (spec) => {
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

const getNavBarItems = (spec) => (
  [
    { name: spec.organization.key },
    { name: spec.application.key },
  ]
);

function* saga(action) {
  const spec = action.payload;
  const navBarItems = getNavBarItems(spec);
  yield put(appActions.updateNavBar(navBarItems));
  const sideBarItems = getSideBarModel(spec);
  yield put(appActions.updateSideBar(sideBarItems));
}

function* takeLatestSaga() {
  yield* takeLatest(specActionTypes.getByOrgkeyAndApplicationkeyAndVersion_success, saga);
}

export {
  saga,
  takeLatestSaga,
};

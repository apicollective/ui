import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { actions as appActions } from '../app';
import { api as specApi } from '../generated/version/getByOrgkeyAndApplicationkeyAndVersion';

const getSideNavModel = (appKey, resources, models) => (
  [{
    name: 'Resources',
    items: resources.map((resource) => (
      {
        name: resource.name,
        items: resource.operations.map((operation) => (
          { name: operation.name, href: `${appKey}/op/${operation.key}` }
        )),
      },
    )),
  },
  {
    name: 'Models',
    items: [{
      name: ''
      items: models.map((model) => (
        { name: `${model.name} - ${model.type}`, href: `${appKey}/model/${model.key}` }
      )),
    }],
  }]
);

function* saga(action) {
  const spec = action.payload;
  const sideBarItems = getSideNavModel(orgKey, applications);
  yield put(appActions.updateSideNav(sideBarItems));
}

function* takeLatestSaga() {
  yield* takeLatest(actionTypes.getByOrgkeyAndApplicationkeyAndVersion_success, saga);
}

export {
  saga,
  takeLatestSaga,
};

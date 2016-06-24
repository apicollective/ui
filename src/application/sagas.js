import { takeLatest } from 'redux-saga';
import { put } from 'redux-saga/effects';

import { actions as appActions } from '../app';
import { actionTypes as specActionTypes } from '../generated/version/';
import { cleanPath, onClickHref } from '../utils';

const getSideBarModel = (spec) => {
  const orgKey = spec.organization.key;
  const appKey = spec.application.key;
  const method = (operation) => operation.method.toLowerCase();
  const path = (operation) => cleanPath(operation.path);
  return [{
    name: 'Resources',
    items: spec.resources.map((resource) => (
      {
        name: resource.type,
        items: resource.operations.map((operation) => (
          {
            name: `${operation.method} ${operation.path}`,
            onClick: onClickHref(
              `/org/${orgKey}/app/${appKey}/r/${resource.type}/m/${method(operation)}/p/${path(operation)}`
            ),
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
          {
            name: `${model.name}`,
            onClick: onClickHref(`/org/${orgKey}/app/${appKey}/m/${model.name}`),
          }
      )).concat(
        spec.enums.map((enumValue) => (
          {
            name: `${enumValue.name}`,
            onClick: onClickHref(`/org/${orgKey}/app/${appKey}/m/${enumValue.name}`),
          }
      ))),
      }],
    }];
};

const getNavBarItems = (spec) => (
  [
    { name: spec.organization.key, onClick: onClickHref(`/org/${spec.organization.key}`) },
    { name: spec.application.key, onClick: onClickHref(`/org/${spec.organization.key}/app/${spec.application.key}`) },
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

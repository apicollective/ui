import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { actions as appActions } from '../app';
import { api as appsApi } from '../generated/organization/getOrganizationsByKey';
import { api as orgsApi } from '../generated/application/getByOrgkey';
import { onClickHref } from '../utils';

const actionTypes = {
  getOrganizationDetails_get: 'getOrganizationDetails/get',
  getOrganizationDetails_doing: 'getOrganizationDetails/doing',
  getOrganizationDetails_success: 'getOrganizationDetails/success',
  getOrganizationDetails_failure: 'getOrganizationDetails/failure',
};

const actions = {
  getOrganizationDetails_get: ({ orgKey } = {}) => ({
    type: actionTypes.getOrganizationDetails_get,
    payload: { orgKey },
  }),
  getOrganizationDetails_doing: () => ({
    type: actionTypes.getOrganizationDetails_doing,
  }),
  getOrganizationDetails_success: (result) => ({
    type: actionTypes.getOrganizationDetails_success,
    payload: result,
  }),
  getOrganizationDetails_failure: (err) => ({
    type: actionTypes.getOrganizationDetails_failure,
    payload: err,
    error: true,
  }),
};

const getSideBarModel = (orgKey, apps) => (
  [{
    name: '',
    items: [
      {
        name: 'Applications',
        items: apps.map((app) => (
          { name: app.name, onClick: onClickHref(`/org/${orgKey}/app/${app.key}`) }
        )),
      },
    ],
  }]
);

const getNavBarItems = (orgKey) => (
  [
    { name: orgKey, onClick: onClickHref(`/org/${orgKey}`) },
  ]
);

function* saga(action) {
  const { orgKey } = action.payload;
  try {
    yield put(actions.getOrganizationDetails_doing());
    const [organization, applications] = yield [
      call(orgsApi, { key: orgKey }),
      call(appsApi, { orgKey }),
    ];
    yield put(actions.getOrganizationDetails_success({
      organization,
      applications,
    }));
    const navBarItems = getNavBarItems(orgKey);
    const sideBarItems = getSideBarModel(orgKey, applications);
    yield put(appActions.updateNavBar(navBarItems));
    yield put(appActions.updateSideBar(sideBarItems));
  } catch (error) {
    yield put(actions.getOrganizationDetails_failure(error));
  }
}

function* takeLatestSaga() {
  yield* takeLatest(actionTypes.getOrganizationDetails_get, saga);
}

export {
  actions,
  actionTypes,
  saga,
  takeLatestSaga,
};

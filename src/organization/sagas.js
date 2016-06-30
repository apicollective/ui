import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { api as appsApi } from '../generated/organization/getOrganizationsByKey';
import { api as orgsApi } from '../generated/application/getByOrgkey';

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

function* saga(action) {
  const { orgKey } = action.payload;
  try {
    yield put(actions.getOrganizationDetails_doing());
    const [appResult, orgResult] = yield [
      call(orgsApi, { orgKey }),
      call(appsApi, { key: orgKey }),
    ];
    const organization = orgResult.body;
    const applications = appResult.body;

    yield put(actions.getOrganizationDetails_success({
      organization,
      applications,
    }));
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

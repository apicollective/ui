// This file is generated

import { takeEvery, takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

function api({ orgKey, name, guid, key, has_version, limit, offset } = {}) {
  return new Promise((resolve) => {
    const response = {
      name: 'Organization one',
      key: 'one',
    };
    resolve(response);
  });
}

const actionTypes = {
  getByOrgkey_get: 'getByOrgkey/get',
  getByOrgkey_doing: 'getByOrgkey/doing',
  getByOrgkey_success: 'getByOrgkey/success',
  getByOrgkey_failure: 'getByOrgkey/failure',
};

const actions = {
  /**
   * Search all applications. Results are always paginated.
   * @param {string} orgKey - The organization key for which to search applications
   * @param {string=} name - The name of an application. Case in-sensitive. Exact match (Optional)
   * @param {uuid=} guid - The guid of an application. Exact match (Optional)
   * @param {string=} key - The key of an application. Case in-sensitive. Exact match (Optional)
   * @param {boolean=} has_version - If true, we return applications that have at least one version. If false, we return applications that have no versions in the system (Optional)
   * @param {long} limit - The number of records to return
   * @param {long} offset - Used to paginate. First page of results is 0.
   */
  getByOrgkey_get: ({ orgKey, name, guid, key, has_version, limit, offset } = {}) => ({
    type: actionTypes.getByOrgkey_get,
    payload: {
      orgKey,
      name,
      guid,
      key,
      has_version,
      limit,
      offset,
    },
  }),
  getByOrgkey_doing: () => ({
    type: actionTypes.getByOrgkey_doing,
  }),
  getByOrgkey_success: (response) => ({
    type: actionTypes.getByOrgkey_success,
    payload: response,
  }),
  getByOrgkey_failure: (err) => ({
    type: actionTypes.getByOrgkey_failure,
    payload: err,
    error: true,
  }),
};

function* saga(action) {
  try {
    yield put(actions.getByOrgkey_doing());
    const response = yield call(api, action.payload);
    yield put(actions.getByOrgkey_success(response));
  } catch (error) {
    yield put(actions.getByOrgkey_failure(error));
  }
}

/**
 * Start this saga if you'd prefer to process every action
 */
function* takeEverySaga() {
  yield* takeEvery(actionTypes.getByOrgkey_get, saga);
}

/**
 * Start this saga if you'd prefer to process only the latest action
 */
function* takeLatestSaga() {
  yield* takeLatest(actionTypes.getByOrgkey_get, saga);
}

export {
  actions,
  actionTypes,
  api,
  saga,
  takeEverySaga,
  takeLatestSaga,
};

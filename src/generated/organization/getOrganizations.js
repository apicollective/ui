// This file is generated
/* eslint-disable max-len */

import { takeEvery, takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

function api({ guid, user_guid, key, name, namespace, limit, offset } = {}) {
  return new Promise((resolve) => {
    const response = [
      {
        name: 'Organization One',
        key: 'one',
      },
      {
        name: 'Organization Two',
        key: 'two',
      },
    ];
    resolve(response);
  });
}

const actionTypes = {
  getOrganizations_get: 'getOrganizations/get',
  getOrganizations_doing: 'getOrganizations/doing',
  getOrganizations_success: 'getOrganizations/success',
  getOrganizations_failure: 'getOrganizations/failure',
};

const actions = {
  /**
   * Search all organizations. Results are always paginated.
   * @param {uuid=} guid - Finds the organization with this guid, if any (Optional)
   * @param {uuid=} user_guid - If specified, restricts to organizations that this user is specifically a member of (e.g. will exclude public organizations with which the user does not have a direct membership). (Optional)
   * @param {string=} key - Find organizations with this key. Case in-sensitive. Exact match (Optional)
   * @param {string=} name - Find organizations with this name. Case in-sensitive. Exact match (Optional)
   * @param {string=} namespace - Find organizations with this namespace. Case in-sensitive. Exact match (Optional)
   * @param {long} limit - The number of records to return
   * @param {long} offset - Used to paginate. First page of results is 0.
   */
  getOrganizations_get: ({ guid, user_guid, key, name, namespace, limit, offset } = {}) => ({
    type: actionTypes.getOrganizations_get,
    payload: {
      guid,
      user_guid,
      key,
      name,
      namespace,
      limit,
      offset,
    },
  }),
  getOrganizations_doing: () => ({
    type: actionTypes.getOrganizations_doing,
  }),
  getOrganizations_success: (response) => ({
    type: actionTypes.getOrganizations_success,
    payload: response,
  }),
  getOrganizations_failure: (err) => ({
    type: actionTypes.getOrganizations_failure,
    payload: err,
    error: true,
  }),
};

function* saga(action) {
  try {
    yield put(actions.getOrganizations_doing());
    const response = yield call(api, action.payload);
    yield put(actions.getOrganizations_success(response));
  } catch (error) {
    yield put(actions.getOrganizations_failure(error));
  }
}

/**
 * Start this saga if you'd prefer to process every action
 */
function* takeEverySaga() {
  yield* takeEvery(actionTypes.getOrganizations_get, saga);
}

/**
 * Start this saga if you'd prefer to process only the latest action
 */
function * takeLatestSaga() {
  yield* takeLatest(actionTypes.getOrganizations_get, saga);
}

export {
  actions,
  actionTypes,
  api,
  saga,
  takeEverySaga,
  takeLatestSaga,
};

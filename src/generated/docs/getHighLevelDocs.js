// This file is generated
/* eslint-disable max-len */

import { takeEvery, takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as request from 'superagent';

function api({ orgKey, name, guid, key, has_version, limit, offset } = {}) {
  return request.get(`${process.env.APIDOC_HOST}/docs/${orgKey}`);
}

const actionTypes = {
  getHighLevelDocs_get: 'getHighLevelDocs/get',
  getHighLevelDocs_doing: 'getHighLevelDocs/doing',
  getHighLevelDocs_success: 'getHighLevelDocs/success',
  getHighLevelDocs_failure: '/failure',
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
  getHighLevelDocs_get: ({ orgKey, name, guid, key, has_version, limit, offset } = {}) => ({
    type: actionTypes.getHighLevelDocs_get,
    payload: {
      orgKey,
    },
  }),
  getHighLevelDocs_doing: () => ({
    type: actionTypes.getHighLevelDocs_doing,
  }),
  getHighLevelDocs_success: response => ({
    type: actionTypes.getHighLevelDocs_success,
    payload: response,
  }),
  getHighLevelDocs_failure: err => ({
    type: actionTypes.getHighLevelDocs_failure,
    payload: err,
    error: true,
  }),
};

function* saga(action) {
  try {
    yield put(actions.getHighLevelDocs_doing());
    const { body } = yield call(api, action.payload);
    yield put(actions.getHighLevelDocs_success(body));
  } catch (error) {
    yield put(actions.getHighLevelDocs_failure(error));
  }
}

/**
 * Start this saga if you'd prefer to process every action
 */
function* takeEverySaga() {
  yield* takeEvery(actionTypes.getHighLevelDocs_get, saga);
}

/**
 * Start this saga if you'd prefer to process only the latest action
 */
function* takeLatestSaga() {
  yield* takeLatest(actionTypes.getHighLevelDocs_get, saga);
}

export {
  actions,
  actionTypes,
  api,
  saga,
  takeEverySaga,
  takeLatestSaga,
};

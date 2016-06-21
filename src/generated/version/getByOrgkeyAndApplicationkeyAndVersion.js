// This file is generated

import { takeEvery, takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import exampleService from '../../exampleService.json';

function api({ orgKey, applicationKey, version } = {}) {
  return new Promise((resolve) => {
    resolve(exampleService);
  });
}

const actionTypes = {
  getByOrgkeyAndApplicationkeyAndVersion_get: 'getByOrgkeyAndApplicationkeyAndVersion/get',
  getByOrgkeyAndApplicationkeyAndVersion_doing: 'getByOrgkeyAndApplicationkeyAndVersion/doing',
  getByOrgkeyAndApplicationkeyAndVersion_success: 'getByOrgkeyAndApplicationkeyAndVersion/success',
  getByOrgkeyAndApplicationkeyAndVersion_failure: 'getByOrgkeyAndApplicationkeyAndVersion/failure',
};

const actions = {
  /**
   * Retrieve a specific version of an application.
   * @param {string} orgKey - 
   * @param {string} applicationKey - 
   * @param {string} version - The version of tthis application to download, or the keyword latest to get the latest version
   */
  getByOrgkeyAndApplicationkeyAndVersion_get: ({ orgKey, applicationKey, version } = {}) => ({
    type: actionTypes.getByOrgkeyAndApplicationkeyAndVersion_get,
    payload: {
      orgKey,
      applicationKey,
      version
    },
  }),
  getByOrgkeyAndApplicationkeyAndVersion_doing: () => ({
    type: actionTypes.getByOrgkeyAndApplicationkeyAndVersion_doing,
  }),
  getByOrgkeyAndApplicationkeyAndVersion_success: (todos) => ({
    type: actionTypes.getByOrgkeyAndApplicationkeyAndVersion_success,
    payload: todos,
  }),
  getByOrgkeyAndApplicationkeyAndVersion_failure: (err) => ({
    type: actionTypes.getByOrgkeyAndApplicationkeyAndVersion_failure,
    payload: err,
    error: true,
  }),
};

function* saga(action) {
  try {
    yield put(actions.getByOrgkeyAndApplicationkeyAndVersion_doing());
    const response = yield call(api, action.payload);
    yield put(actions.getByOrgkeyAndApplicationkeyAndVersion_success(response));
  } catch (error) {
    yield put(actions.getByOrgkeyAndApplicationkeyAndVersion_failure(error));
  }
}

/**
 * Start this saga if you'd prefer to process every action
 */
function* takeEverySaga() {
  yield* takeEvery(actionTypes.getByOrgkeyAndApplicationkeyAndVersion_get, saga);
}

/**
 * Start this saga if you'd prefer to process only the latest action
 */
function* takeLatestSaga() {
  yield* takeLatest(actionTypes.getByOrgkeyAndApplicationkeyAndVersion_get, saga);
}

export {
  actions,
  actionTypes,
  api,
  saga,
  takeEverySaga,
  takeLatestSaga,
};

// This file is generated

import { takeEvery, takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

function api({ key }) {
  return new Promise((resolve) => {
    const response = [
        {
          name: 'Application One',
          key: 'one',
        },
      {
        name: 'Application Two',
        key: 'two',
      },
    ];
    resolve(response);
  });
}

const actionTypes = {
  getOrganizationsByKey_get: 'getOrganizationsByKey/get',
  getOrganizationsByKey_doing: 'getOrganizationsByKey/doing',
  getOrganizationsByKey_success: 'getOrganizationsByKey/success',
  getOrganizationsByKey_failure: 'getOrganizationsByKey/failure',
};

const actions = {
  /**
   * Returns the organization with this key.
   * @param {string} key - 
   */
  getOrganizationsByKey_get: (key) => ({
    type: actionTypes.getOrganizationsByKey_get,
    payload: {
      key
    },
  }),
  getOrganizationsByKey_doing: () => ({
    type: actionTypes.getOrganizationsByKey_doing,
  }),
  getOrganizationsByKey_success: (response) => ({
    type: actionTypes.getOrganizationsByKey_success,
    payload: response,
  }),
  getOrganizationsByKey_failure: (err) => ({
    type: actionTypes.getOrganizationsByKey_failure,
    payload: err,
    error: true,
  }),
};

function* saga(action) {
  try {
    yield put(actions.getOrganizationsByKey_doing());
    const response = yield call(api, action.payload);
    yield put(actions.getOrganizationsByKey_success(response));
  } catch (error) {
    yield put(actions.getOrganizationsByKey_failure(error));
  }
}

/**
 * Start this saga if you'd prefer to process every action
 */
function* takeEverySaga() {
  yield* takeEvery(actionTypes.getOrganizationsByKey_get, saga);
}

/**
 * Start this saga if you'd prefer to process only the latest action
 */
function* takeLatestSaga() {
  yield* takeLatest(actionTypes.getOrganizationsByKey_get, saga);
}

export {
  actions,
  actionTypes,
  api,
  saga,
  takeEverySaga,
  takeLatestSaga,
};

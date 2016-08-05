// This file is generated
/* eslint-disable max-len */

import { takeEvery, takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as request from 'superagent';
import { resolve } from 'url';

function api({ rootUrl, markdownPath } = {}) {
  const url = resolve(rootUrl, markdownPath);
  return request.get(url);
}

const actionTypes = {
  getByRootUrlAndMarkdownPath_get: 'getByRootUrlAndMarkdownPath/get',
  getByRootUrlAndMarkdownPath_doing: 'getByRootUrlAndMarkdownPath/doing',
  getByRootUrlAndMarkdownPath_success: 'getByRootUrlAndMarkdownPath/success',
  getByRootUrlAndMarkdownPath_failure: 'getByRootUrlAndMarkdownPath/failure',
};

const actions = {
  getByRootUrlAndMarkdownPath_get: ({ rootUrl, markdownPath } = {}) => ({
    type: actionTypes.getByRootUrlAndMarkdownPath_get,
    payload: {
      rootUrl,
      markdownPath,
    },
  }),
  getByRootUrlAndMarkdownPath_doing: () => ({
    type: actionTypes.getByRootUrlAndMarkdownPath_doing,
  }),
  getByRootUrlAndMarkdownPath_success: (response) => ({
    type: actionTypes.getByRootUrlAndMarkdownPath_success,
    payload: response,
  }),
  getByRootUrlAndMarkdownPath_failure: (err) => ({
    type: actionTypes.getByRootUrlAndMarkdownPath_failure,
    payload: err,
    error: true,
  }),
};

function* saga(action) {
  try {
    const rootUrl = action.payload.rootUrl;
    yield put(actions.getByRootUrlAndMarkdownPath_doing());
    const { text } = yield call(api, action.payload);

    const imagesRegex = /!\[(.*)\]\(/;
    const textWithImages = text.replace(imagesRegex, `![$1](${rootUrl}/`);

    yield put(actions.getByRootUrlAndMarkdownPath_success(textWithImages));
  } catch (error) {
    yield put(actions.getByRootUrlAndMarkdownPath_failure(error));
  }
}

/**
 * Start this saga if you'd prefer to process every action
 */
function* takeEverySaga() {
  yield* takeEvery(actionTypes.getByRootUrlAndMarkdownPath_get, saga);
}

/**
 * Start this saga if you'd prefer to process only the latest action
 */
function* takeLatestSaga() {
  yield* takeLatest(actionTypes.getByRootUrlAndMarkdownPath_get, saga);
}

export {
  actions,
  actionTypes,
  api,
  saga,
  takeEverySaga,
  takeLatestSaga,
};

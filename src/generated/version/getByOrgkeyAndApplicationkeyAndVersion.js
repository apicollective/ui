// This file is generated
/* eslint-disable max-len */

import { takeEvery, takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as request from 'superagent';

// import exampleService from '../../exampleService.json';

function api({ orgKey, applicationKey, version } = {}) {
  return request.get(`/api/${orgKey}/${applicationKey}/latest`);
  // return new Promise((resolve) => {
  //   resolve(exampleService);
  // });
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
      version,
    },
  }),
  getByOrgkeyAndApplicationkeyAndVersion_doing: () => ({
    type: actionTypes.getByOrgkeyAndApplicationkeyAndVersion_doing,
  }),
  getByOrgkeyAndApplicationkeyAndVersion_success: payload => ({
    type: actionTypes.getByOrgkeyAndApplicationkeyAndVersion_success,
    payload,
  }),
  getByOrgkeyAndApplicationkeyAndVersion_failure: err => ({
    type: actionTypes.getByOrgkeyAndApplicationkeyAndVersion_failure,
    payload: err,
    error: true,
  }),
};

const namespaceEntities = (namespace, entities, entityType) =>
  entities.map(entity => Object.assign(
    entity,
    { name: `${namespace}.${entityType}.${entity.name}`, plural: `${namespace}.${entityType}.${entity.plural}` },
  ));

function* saga(action) {
  try {
    yield put(actions.getByOrgkeyAndApplicationkeyAndVersion_doing());
    const { body } = yield call(api, action.payload);
    const calls = body.service.imports.map(importValue =>
        call(
            api,
          { orgKey: importValue.organization.key,
            applicationKey: importValue.application.key,
            version: importValue.version },
        ),
    );
    const results = yield calls;
    body.importedServices = results.map((result) => {
      const service = result.body.service;
      namespaceEntities(service.namespace, service.models, 'models');
      namespaceEntities(service.namespace, service.enums, 'enums');
      return service;
    });

    yield put(actions.getByOrgkeyAndApplicationkeyAndVersion_success(body));
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

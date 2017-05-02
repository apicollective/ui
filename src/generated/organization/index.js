// This file is generated

import * as getOrganizations from 'generated/organization/getOrganizations';

const actionTypes = Object.assign({}, getOrganizations.actionTypes);

const actions = Object.assign({}, getOrganizations.actions);

const sagas = {
  getOrganizationsTakeEverySaga: getOrganizations.takeEverySaga,
  getOrganizationsTakeLatestSaga: getOrganizations.takeLatestSaga,
};

export { actionTypes, actions, sagas };

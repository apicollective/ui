// @flow
import { sagas as orgSagas } from '../generated/organization';
import { sagas as specSagas } from '../generated/version';
import { takeLatestSaga as documentationSaga } from '../generated/documentation/getByRootUrlAndMarkdownPath';
import { takeLatestSaga as organizationSaga } from '../organization/sagas';

const allSagas = [].concat(
  orgSagas.getOrganizationsTakeLatestSaga,
  specSagas.getByOrgkeyAndApplicationkeyAndVersionLatestSaga,
  organizationSaga,
  documentationSaga,
);

export default allSagas;


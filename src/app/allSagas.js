import { sagas as orgSagas } from '../generated/organization';
import { sagas as specSagas } from '../generated/version';
import { takeLatestSaga as organizationSaga } from '../organization';
import { takeLatestSaga as applicationSaga } from '../application';

console.log(applicationSaga);

const allSagas = [].concat(
  orgSagas.getOrganizationsTakeLatestSaga,
  specSagas.getByOrgkeyAndApplicationkeyAndVersionLatestSaga,
  organizationSaga,
  applicationSaga
);

export default allSagas;


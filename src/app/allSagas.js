import { sagas as orgSagas } from '../generated/organization';
import { sagas as specSagas } from '../generated/version';
import { takeLatestSaga as organizationSaga } from '../organization';

const allSagas = [].concat(
  orgSagas.getOrganizationsTakeLatestSaga,
  specSagas.getByOrgkeyAndApplicationkeyAndVersionLatestSaga,
  organizationSaga
);

export default allSagas;


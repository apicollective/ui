import { sagas as orgSagas } from '../generated/organization';
import { takeLatestSaga as orgTakeLatestSaga } from '../organization';

const allSagas = [].concat(
  orgSagas.getOrganizationsTakeEverySaga,
  orgTakeLatestSaga
);

export default allSagas;


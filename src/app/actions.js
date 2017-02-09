// @flow
import type { Model } from '../generated/version/ServiceType';

const actionTypes = {
  updateCurrentPage: 'app/updateCurrentPage',
  updateNavBar: 'app/updateNavBar',
  updateSideBar: 'app/updateSideBar',
};

const updateCurrentPage = (page: Object) => (
  { type: actionTypes.updateCurrentPage, payload: page }
);

const updateNavBar = (model: Model) => (
    { type: actionTypes.updateNavBar, payload: model }
);

const updateSideBar = (model: Model) => (
  { type: actionTypes.updateSideBar, payload: model }
);

const actions = {
  updateCurrentPage,
  updateNavBar,
  updateSideBar,
};

export {
  actionTypes,
  actions,
};

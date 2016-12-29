const actionTypes = {
  updateCurrentPage: 'app/updateCurrentPage',
  updateNavBar: 'app/updateNavBar',
  updateSideBar: 'app/updateSideBar',
};

const updateCurrentPage = page => (
  { type: actionTypes.updateCurrentPage, payload: page }
);

const updateNavBar = model => (
    { type: actionTypes.updateNavBar, payload: model }
);

const updateSideBar = model => (
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

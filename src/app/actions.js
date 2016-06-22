const actionTypes = {
  updateNavBar: 'app/updateNavBar',
  updateSideBar: 'app/updateSideBar',
};

const updateNavBar = (model) => (
  { type: actionTypes.updateNavBar, payload: model }
);
const updateSideBar = (model) => (
  { type: actionTypes.updateSideBar, payload: model }
);

const actions = {
  updateNavBar,
  updateSideBar,
};

export {
  actionTypes,
  actions,
};

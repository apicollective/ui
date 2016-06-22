const actionTypes = {
  updateNavBar: 'app/updateNavBar',
  updateSideBar: 'app/updateSideBar',
};

function updateNavBar(model) {
  return { type: actionTypes.updateNavBar, payload: model };
}
function updateSideBar(model) {
  return { type: actionTypes.updateSideBar, payload: model };
}

const actions = {
  updateNavBar,
  updateSideBar,
};

export {
  actionTypes,
  actions,
};

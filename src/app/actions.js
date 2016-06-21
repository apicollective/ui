const actionTypes = {
  updateNavBar: 'app/updateNavBar',
  updateSideNav: 'app/updateNavBar',
};

function updateNavBar(model) {
  return { type: actionTypes.updateNavBar, payload: model };
}
function updateSideNav(model) {
  return { type: actionTypes.updateSideNav, payload: model };
}

const actions = {
  updateNavBar,
  updateSideNav,
};

export {
  actionTypes,
  actions,
};

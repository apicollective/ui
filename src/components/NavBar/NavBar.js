// @flow
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBarContents from 'components/NavBar/NavBarContents';

const NavBar = () => (
  <Switch>
    <Route
      path="/org/:organizationKey/app/:applicationKey/r/:resource/m/:method/p/:path"
      component={NavBarContents}
    />
    <Route
      path="/org/:organizationKey/app/:applicationKey/m/:model"
      component={NavBarContents}
    />
    <Route
      path="/org/:organizationKey/app/:applicationKey"
      component={NavBarContents}
    />
    {/* <Route
          path="/org/:organizationKey/doc/:documentationKey"
          component={Documentation}
          /> */}
    <Route path="/org/:organizationKey" component={NavBarContents} />
    <Route component={NavBarContents} />
  </Switch>
);

export default NavBar;

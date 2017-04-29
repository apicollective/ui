// @flow
import React from 'react';
import { IndexRoute, Route } from 'react-router';

import { App } from './app';

import Home from './home';
import Organization from './organization';
import { Appln } from './application';
import Documentation from './documentation';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="org/:organizationKey" component={Organization} />
    <Route path="org/:organizationKey/app/:applicationKey" component={Appln} />
    <Route
      path="org/:organizationKey/doc/:documentationKey"
      component={Documentation}
    />
    <Route
      path="org/:organizationKey/app/:applicationKey/r/:resource/m/:method/p/:path"
      component={Appln}
    />
    <Route
      path="org/:organizationKey/app/:applicationKey/m/:model"
      component={Appln}
    />
  </Route>
);

export default routes;

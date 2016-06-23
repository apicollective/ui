import React from 'react';
import { IndexRoute, Route } from 'react-router';

import { App } from './app';

import { Home } from './home';
import { Organization } from './organization';
import { Application } from './application';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="org/:organizationKey" component={Organization} />
    <Route path="org/:organizationKey/app/:applicationKey" component={Application} />
    <Route path="org/:organizationKey/app/:applicationKey/r/:resource/m/:method/p/:path" component={Application} />
    <Route path="org/:organizationKey/app/:applicationKey/m/:model" component={Application} />
  </Route>
);

export default routes;

import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './app/App';

import * as application from './application';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={application.Application} />
  </Route>
);

export default routes;

import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './app/App';

import { Application } from './application';
import { Home } from './home';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Application} />
    <Route path="app" component={Application}/>
  </Route>
);
  // <Route path="/" component={App}>
  // <IndexRoute component={Home} />
  // <Route path="app" component={Application}/>
  // </Route>

export default routes;

// @flow
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from 'home';
import OrganizationComponent from 'organization';
import { Appln } from 'application';
import Documentation from 'documentation';

import NavBar from 'components/NavBar/NavBar';
import SideBar from 'components/SideBar/SideBar';
import Content from 'components/Content';
import Login from 'login/Login';

import styles from 'app/components/app.css';

type Props = {|
  history: string, // FIXME - type
|};

const App = (props: Props) =>
  <div>
    <NavBar />
    <div className={styles.main}>
      <SideBar history={props.history} />
      <Content>
        <Switch>
          <Route
            path="/org/:organizationKey/app/:applicationKey/r/:resource/m/:method/p/:path"
            component={Appln}
          />
          <Route
            path="/org/:organizationKey/app/:applicationKey/m/:model"
            component={Appln}
          />
          <Route
            path="/org/:organizationKey/app/:applicationKey"
            component={Appln}
          />
          <Route
            path="/org/:organizationKey/doc/:documentationKey"
            component={Documentation}
          />
          <Route
            path="/org/:organizationKey"
            component={OrganizationComponent}
          />
          <Route path="/login" component={Login} />
          <Route component={Home} />
        </Switch>
      </Content>
    </div>
  </div>;

export default App;

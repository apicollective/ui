// @flow
import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';

import Home from 'home';
import OrganizationComponent from 'organization';
import { Appln } from 'application';
import Documentation from 'documentation';

import NavBar from 'components/NavBar/NavBar';
import SideBar from 'components/SideBar/SideBar';
import Content from 'components/Content';

import styles from 'app/components/app.css';

type Props = {|
  history: string,
|};

const App = (props: Props) =>
  <ConnectedRouter history={props.history}>
    <div>
      <NavBar />
      <div className={styles.main}>
        <SideBar />
        <Content>
          <Switch>
            <Route
              extact={true}
              path="/org/:organizationKey/app/:applicationKey"
              component={Appln}
            />
            <Route
              extact={true}
              path="/org/:organizationKey/app/:applicationKey/r/:resource/m/:method/p/:path"
              component={Appln}
            />
            <Route
              extact={true}
              path="/org/:organizationKey/app/:applicationKey/m/:model"
              component={Appln}
            />
            <Route
              extact={true}
              path="/org/:organizationKey/doc/:documentationKey"
              component={Documentation}
            />
            <Route
              extact={true}
              path="/org/:organizationKey"
              component={OrganizationComponent}
            />
            <Route component={Home} />
          </Switch>
        </Content>
      </div>
    </div>
  </ConnectedRouter>;

export default App;

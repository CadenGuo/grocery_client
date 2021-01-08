import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { Layout, Affix } from 'antd';
import NavBarComponent from './mainLayout/navBarComponent';
import routerList from './routerList';
import MainContentComponent from './mainLayout/mainContentComponent';
import 'antd/dist/antd.css';
import './App.css';
import Paths from './common/paths';
import history from './appHistory';

const PrivateRoute = ({ component: AppComponent, path, ...rest }: any) => {
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return <AppComponent {...props} />;
      }}
    />
  );
};

interface IStateProps {
}

type Props = IStateProps;

class App extends Component<Props> {
  render() {
    const navBarPath = [
      Paths.HOME,
      Paths.ROOT,
    ];

    return (
      <div style={{ height: '100%' }}>
        <Router history={history}>
          <Layout style={{ height: '100%' }}>
            <Affix>
              <Route
                exactly={false}
                path={navBarPath}
                component={NavBarComponent}
              />
            </Affix>
            {
              routerList.map(route => {
                const { component } = route;
                let mainComponent = null;
                if (route.sideBar !== null) {
                  mainComponent = () => (<MainContentComponent route={route} />);
                }

                return (
                  <PrivateRoute
                    key={route.path}
                    path={route.path}
                    exact={route.exactPath}
                    component={mainComponent || component}
                  />
                );
              })
            }
          </Layout>
        </Router>
      </div>
    );
  }
}

export default App;

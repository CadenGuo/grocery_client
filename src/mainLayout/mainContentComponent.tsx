import React, { Component } from 'react';
import { Layout } from 'antd';
import { Route } from 'react-router-dom';
import { APP_LAYOUT_CONSTANT } from 'common/constants';

const { Content } = Layout;

interface IOwnProps {
  route: any;
}

type Props = IOwnProps;

class MainContentComponent extends Component<Props> {
  render() {
    const { route } = this.props;
    const SideBar = route.sideBar;

    return (
      <Layout
        style={{ height: '100%' }}
      >
        <Route
          exact={route.exactPath}
          path={route.path}
          component={SideBar}
        />
        <Layout>
          <Content
            style={{ padding: APP_LAYOUT_CONSTANT.MAIN_CONTENT_PADDING, height: '100%' }}
          >
            <div style={{
              padding: APP_LAYOUT_CONSTANT.MAIN_CONTENT_INNER_PADDING,
              height: '100%',
              width: '100%',
              overflow: 'auto',
              background: 'white',
              marginBottom: APP_LAYOUT_CONSTANT.MAIN_CONTENT_INNER_MARGING_BOTTOM,
            }}>
              <Route
                exact={route.exactPath}
                path={route.path}
                component={route.component}
              />
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default MainContentComponent;

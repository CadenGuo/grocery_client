import React, { Component } from 'react';
import {
  Layout, Menu, Dropdown,
} from 'antd';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import NavBarLogo from './navBarLogo';
import { generateGroceryModulePath } from 'common/paths';
import { IBaseRouterComponent } from 'common/utils/types';

const { Header } = Layout;

interface IDispatchProps {
  logout: () => void;
}

interface IStateProps {
  user: any;
}

type Props = IDispatchProps & IStateProps & IBaseRouterComponent;

class NavBarComponent extends Component<Props> {
  logout() {
    const { logout } = this.props;
    logout();
  }

  getMenuLinkItem(text: string, link: string, key: string, redirect = false, disable = false) {
    return (
      <Menu.Item key={key} disabled={disable}>
        {redirect ? (
          <a
            href={link}
            onClick={() => { window.location.href = link; }}
            className="nav-bar-links"
          >
            {text}
          </a>
        ) : (
            <Link to={link}>
              <div className="nav-bar-links">
                {text}
              </div>
            </Link>
          )}
      </Menu.Item>
    );
  }

  getTitleDropDown(
    dropDownItems: { disabled?: boolean, name: string, redirect?: boolean, linkTo: string }[],
    title: string,
  ) {
    const resourceMenu = (
      <Menu>
        {dropDownItems.map((item) => {
          return !item.disabled && (
            <Menu.Item key={item.name}>
              {item.redirect ? (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a href="#" onClick={() => { window.location.href = item.linkTo; }}>
                  {item.name}
                </a>
              ) : (
                  <Link to={item.linkTo}>
                    <div>
                      {item.name}
                    </div>
                  </Link>
                )}
            </Menu.Item>
          );
        })}
      </Menu>
    );

    const dropDown = (
      <Dropdown overlay={resourceMenu} trigger={['click']}>
        <div className="nav-bar-links">
          {title}
        </div>
      </Dropdown>
    );

    return (
      <Menu.SubMenu key={title} title={dropDown} />
    );
  }

  render() {
    const resourceDropdownItems = [{
      name: 'Grocery Items',
      linkTo: generateGroceryModulePath({ type: 'grocery_item' }),
    }, {
      name: 'Drink',
      linkTo: generateGroceryModulePath({ type: 'drink' }),
    }, {
      name: 'Dishes',
      linkTo: generateGroceryModulePath({ type: 'dishes' }),
    }];

    const MenuContent = [
      this.getTitleDropDown(resourceDropdownItems, 'Grocery'),
    ];

    return (
      <div>
        <Header style={{ height: '50px' }}>
          <NavBarLogo />
          <Menu
            mode="horizontal"
            theme="dark"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '50px' }}
            selectable={false}
          >
            {MenuContent}
          </Menu>
        </Header>
      </div>
    );
  }
}

export default withRouter(NavBarComponent);

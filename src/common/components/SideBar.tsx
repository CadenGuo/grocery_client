import React, { ReactNode } from 'react';
import { Menu, Layout, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { APP_LAYOUT_CONSTANT } from 'common/constants';

const { Sider } = Layout;

interface IMenuContent {
  key: string;
  title: string | ReactNode;
  to?: string;
  icon?: ReactNode;
  disabled?: boolean;
  redirect?: boolean;
  subMenu?: IMenuContent[];
}

interface IOwnProps {
  title: string;
  menuContents?: IMenuContent[];
  defaultSelectedKeys?: string[];
  defaultOpenKeys?: string[];
  children?: React.ReactNode;
}

type Props = IOwnProps;

class RCSideBar extends React.Component<Props> {
  static defaultProps = {
    defaultSelectedKeys: [],
  };

  getSideBarTitle = (title: string | ReactNode) => {
    return (
      <div>
        <div className="main-menu-title">
          {title}
        </div>
      </div>
    );
  }

  getSideMenu = (menuContents: IMenuContent[]) => {
    return menuContents.map(content => {
      if (content.subMenu) {
        return <Menu.SubMenu
          key={content.key}
          title={<>{content.icon}{content.title}</>}
          disabled={content.disabled}
        >
          {this.getSideMenu(content.subMenu)}
        </Menu.SubMenu>;
      } else if (content.to) {
        return <Menu.Item key={content.key} disabled={content.disabled}>
          {content.redirect ? (
            <a href={content.to} onClick={() => { window.location.href = content.to as string; }}>
              {content.icon}
              {content.title}
            </a>
          ) : (
              <Link to={content.to}>
                {content.icon}
                {content.title}
              </Link>
            )}
        </Menu.Item>;
      }
      return null;
    });
  }

  render() {
    const {
      title,
      defaultSelectedKeys,
      defaultOpenKeys,
      menuContents,
      children,
    } = this.props;

    return (<Sider
      width={APP_LAYOUT_CONSTANT.SIDEBAR_WIDTH}
      style={{
        boxShadow: '1px 1px 10px #C6C6C6',
        backgroundColor: 'white',
        height: '100%',
        overflow: 'auto',
      }}
    >
      {this.getSideBarTitle(title)}
      <Divider style={{ margin: 0 }} />
      {!children && <Menu
        mode="inline"
        defaultOpenKeys={defaultOpenKeys}
        defaultSelectedKeys={defaultSelectedKeys}
      >
        {this.getSideMenu(menuContents || [])}
      </Menu>}
      {children}
    </Sider>);
  }
}

export default RCSideBar;

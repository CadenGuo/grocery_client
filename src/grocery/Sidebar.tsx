import React from 'react';
import { ShopTwoTone, ExperimentTwoTone } from '@ant-design/icons';
import { SideBar } from 'common/components';
import { GROCERY_MODULE_TYPE } from 'common/constants';
import { generateGroceryModulePath } from 'common/paths';
import { IBaseRouterComponent } from 'common/utils/types';
import { queryStringParse } from 'common/utils/stringUtils';

interface IStateProps { }
interface IDispatchProps { }
type Props = IStateProps & IDispatchProps & IBaseRouterComponent;

const Sidebar: React.FC<Props> = ({ location }) => {
  const pathParams: any = queryStringParse(location.search);
  const { type } = pathParams;

  const menuContents = [{
    key: 'grocery_tem',
    title: 'Grocery Item',
    icon: <ShopTwoTone />,
    to: generateGroceryModulePath({ type: GROCERY_MODULE_TYPE.GROCERY_ITEM }),
  }, {
    key: 'drink',
    title: 'Drink',
    icon: <ExperimentTwoTone />,
    to: generateGroceryModulePath({ type: GROCERY_MODULE_TYPE.DRINK }),
  }];

  return <SideBar
    title="Grocery"
    menuContents={menuContents}
    defaultSelectedKeys={type}
  />;
};

export default Sidebar;

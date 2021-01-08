import React from 'react';
import { IBaseRouterComponent } from 'common/utils/types';
import { queryStringParse } from 'common/utils/stringUtils';
import { GROCERY_MODULE_TYPE } from 'common/constants';
import { AllGroceryItemComponent } from './groceryItem';
import { AllDrinkComponent } from './drink';

const GroceryPage: React.FC<IBaseRouterComponent> = ({
  location,
}) => {
  const pathParams = queryStringParse(location.search);
  let ComponentToRender: any = () => null;
  if (pathParams.type === GROCERY_MODULE_TYPE.GROCERY_ITEM) {
    ComponentToRender = AllGroceryItemComponent;
  } else if (pathParams.type === GROCERY_MODULE_TYPE.DRINK) {
    ComponentToRender = AllDrinkComponent;
  } else if (pathParams.type === GROCERY_MODULE_TYPE.DISHES) {
    return <ComponentToRender pathParams={pathParams} />;
  }
  return <ComponentToRender pathParams={pathParams} />;
};

export default GroceryPage;

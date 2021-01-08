import { IBaseActionType } from './actionUtils';
/*
  ///params example:///
  const stateMap = {
    admin: [
      'userList',
      'companyList',
      'productList',
    ],
  };
  const actionMapT = {
    admin: [
      ActionTypes.LIST_USER.name || 'LIST_USER',
      ActionTypes.LIST_COMPANY.name || 'LIST_COMPANY',
      ActionTypes.LIST_PRODUCT.name || 'LIST_PRODUCT',
    ],
  };

  ///returns:///
  func(state): Object (mapStateToProps function)
*/
interface IStateMap {
  [key: string]: string[];
}

interface IActionMap {
  [key: string]: IBaseActionType[];
}
const generateMapStateToProps = (stateMap: IStateMap, actionMap: IActionMap) => {
  return (state: any) => {
    const valueStateArray = Object.keys(stateMap).map(parentStateName => {
      const stateValueFromOneParentState = stateMap[parentStateName].map(stateName => {
        return {
          [stateName]: state[parentStateName][`${parentStateName}State`][stateName],
        };
      });
      return Object.assign({}, ...stateValueFromOneParentState);
    });
    const valueStateObject = valueStateArray.length === 0 ? {} : Object.assign({}, ...valueStateArray);

    const actionStateArray = Object.keys(actionMap).map(parentStateName => {
      const actionValueFromOneParentState = actionMap[parentStateName].map(action => {
        return {
          [`${action.name}_ACTION`]: state[parentStateName][`${parentStateName}ActionStatusManager`][action.name],
        };
      });
      return Object.assign({}, ...actionValueFromOneParentState);
    });
    const actionStateObject = actionStateArray.length === 0 ? {} : Object.assign({}, ...actionStateArray);

    return Object.assign(valueStateObject, actionStateObject);
  };
};

export default generateMapStateToProps;

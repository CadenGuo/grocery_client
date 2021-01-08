import { combineReducers } from 'redux';
import ActionTypes, { actionStatusManager } from './actionTypes';
import { notifyError, notifySuccess, IBaseAction } from '../common/utils/actionUtils';
import getErrorMsg from '../common/errors';

const initState = () => ({
  groceryItemList: [],
  drinkList: [],
  dishesList: [],
});


const groceryState = (state = initState(), action: IBaseAction) => {
  switch (action.type) {
    case ActionTypes.LIST_GROCERY_ITEM.SUCCEEDED:
      return {
        ...state,
        groceryItemList: action.data,
      };
    case ActionTypes.LIST_DRINK.SUCCEEDED:
      return {
        ...state,
        drinkList: action.data,
      };
    case ActionTypes.LIST_DISHES.SUCCEEDED:
      return {
        ...state,
        dishesList: action.data,
      };
    case ActionTypes.CREATE_GROCERY_ITEM.SUCCEEDED:
    case ActionTypes.UPDATE_GROCERY_ITEM.SUCCEEDED:
    case ActionTypes.DELTE_GROCERY_ITEM.SUCCEEDED:
    case ActionTypes.CREATE_DRINK.SUCCEEDED:
    case ActionTypes.UPDATE_DRINK.SUCCEEDED:
    case ActionTypes.DELTE_DRINK.SUCCEEDED:
    case ActionTypes.CREATE_DISHES.SUCCEEDED:
    case ActionTypes.UPDATE_DISHES.SUCCEEDED:
    case ActionTypes.DELTE_DISHES.SUCCEEDED:
      notifySuccess('Success!');
      return state;
    case ActionTypes.LIST_GROCERY_ITEM.FAILED:
    case ActionTypes.CREATE_GROCERY_ITEM.FAILED:
    case ActionTypes.UPDATE_GROCERY_ITEM.FAILED:
    case ActionTypes.DELTE_GROCERY_ITEM.FAILED:
    case ActionTypes.LIST_DRINK.FAILED:
    case ActionTypes.CREATE_DRINK.FAILED:
    case ActionTypes.UPDATE_DRINK.FAILED:
    case ActionTypes.DELTE_DRINK.FAILED:
    case ActionTypes.LIST_DISHES.FAILED:
    case ActionTypes.CREATE_DISHES.FAILED:
    case ActionTypes.UPDATE_DISHES.FAILED:
    case ActionTypes.DELTE_DISHES.FAILED:
      notifyError(getErrorMsg(action.error));
      return state;
    default:
      return state;
  }
};

const grocery = combineReducers({
  groceryState,
  groceryActionStatusManager: actionStatusManager,
});

export default grocery;

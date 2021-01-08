import { all } from 'redux-saga/effects';
import ActionTypes from 'grocery/actionTypes';
import { createSagaWatcherWrapper } from 'common/utils/actionUtils';
import {
  apiListGroceryItem,
  apiCreateGroceryItem,
  apiUpdateGroceryItem,
  apiDeleteGroceryItem,
  apiListDrink,
  apiCreateDrink,
  apiUpdateDrink,
  apiDeleteDrink,
  apiListDishes,
  apiCreateDishes,
  apiUpdateDishes,
  apiDeleteDishes,
} from 'common/api';

export default function* watchConnectivity() {
  yield all([
    createSagaWatcherWrapper(ActionTypes.LIST_GROCERY_ITEM, apiListGroceryItem),
    createSagaWatcherWrapper(ActionTypes.CREATE_GROCERY_ITEM, apiCreateGroceryItem),
    createSagaWatcherWrapper(ActionTypes.UPDATE_GROCERY_ITEM, apiUpdateGroceryItem),
    createSagaWatcherWrapper(ActionTypes.DELTE_GROCERY_ITEM, apiDeleteGroceryItem),
    createSagaWatcherWrapper(ActionTypes.LIST_DRINK, apiListDrink),
    createSagaWatcherWrapper(ActionTypes.CREATE_DRINK, apiCreateDrink),
    createSagaWatcherWrapper(ActionTypes.UPDATE_DRINK, apiUpdateDrink),
    createSagaWatcherWrapper(ActionTypes.DELTE_DRINK, apiDeleteDrink),
    createSagaWatcherWrapper(ActionTypes.LIST_DISHES, apiListDishes),
    createSagaWatcherWrapper(ActionTypes.CREATE_DISHES, apiCreateDishes),
    createSagaWatcherWrapper(ActionTypes.UPDATE_DISHES, apiUpdateDishes),
    createSagaWatcherWrapper(ActionTypes.DELTE_DISHES, apiDeleteDishes),
  ]);
}

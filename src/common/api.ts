import * as requests from './requestSchema';

export type ApiFun<T> = (params?: T) => Promise<any>;

const URL_API_BACKEND = '/api';

// apis
const URL_GROCERY_ITEM = `${URL_API_BACKEND}/grocery_item`;
const URL_DRINK = `${URL_API_BACKEND}/drink`;
const URL_DISHES = `${URL_API_BACKEND}/dishes`;

export const apiListGroceryItem: ApiFun<object> = params => requests.getJsonWithQuery(URL_GROCERY_ITEM, params);
export const apiCreateGroceryItem: ApiFun<object> = params => requests.postJson(URL_GROCERY_ITEM, params);
export const apiUpdateGroceryItem: ApiFun<object> = params => requests.putJson(URL_GROCERY_ITEM, params);
export const apiDeleteGroceryItem: ApiFun<object> = params => requests.deleteJson(URL_GROCERY_ITEM, params);
export const apiListDrink: ApiFun<object> = params => requests.getJsonWithQuery(URL_DRINK, params);
export const apiCreateDrink: ApiFun<object> = params => requests.postJson(URL_DRINK, params);
export const apiUpdateDrink: ApiFun<object> = params => requests.putJson(URL_DRINK, params);
export const apiDeleteDrink: ApiFun<object> = params => requests.deleteJson(URL_DRINK, params);
export const apiListDishes: ApiFun<object> = params => requests.getJsonWithQuery(URL_DISHES, params);
export const apiCreateDishes: ApiFun<object> = params => requests.postJson(URL_DISHES, params);
export const apiUpdateDishes: ApiFun<object> = params => requests.putJson(URL_DISHES, params);
export const apiDeleteDishes: ApiFun<object> = params => requests.deleteJson(URL_DISHES, params);

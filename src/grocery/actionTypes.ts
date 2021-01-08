import createRequestTypes, { createActionStatusManager } from 'common/utils/actionUtils';

const ACTION_TYPES = [
  'LIST_GROCERY_ITEM',
  'CREATE_GROCERY_ITEM',
  'UPDATE_GROCERY_ITEM',
  'DELTE_GROCERY_ITEM',
  'LIST_DRINK',
  'CREATE_DRINK',
  'UPDATE_DRINK',
  'DELTE_DRINK',
  'LIST_DISHES',
  'CREATE_DISHES',
  'UPDATE_DISHES',
  'DELTE_DISHES',
] as const;
type TAction = typeof ACTION_TYPES[number];

export default createRequestTypes<TAction>(...ACTION_TYPES);
export const actionStatusManager = createActionStatusManager<TAction>(...ACTION_TYPES);

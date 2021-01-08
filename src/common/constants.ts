/////////////////////////////////////////////////////
////////////////////// general //////////////////////
/////////////////////////////////////////////////////
export const isDevOrTest = window.location.host.startsWith('localhost') || window.location.host.startsWith('test');

export const APP_LAYOUT_CONSTANT = {
  SIDEBAR_WIDTH: 250,
  MAIN_CONTENT_PADDING: '0 0.75rem 0 0.75rem',
  MAIN_CONTENT_INNER_PADDING: '1.25rem',
  MAIN_CONTENT_INNER_MARGING_BOTTOM: '5px',
};

export const RESPONSE_STATUS = {
  ERROR: 0,
  SUCCESS: 1,
};

export const ACTION_STATUS = {
  REQUESTED: 'REQUESTED',
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED',
};

export const GENERIC_FIELD = {
  REQUIRED: 'This field is required',
  INVALID: 'Invalid input',
};

/////////////////////////////////////////////////////
////////////////// Grocery /////////////////////
/////////////////////////////////////////////////////
export const GROCERY_MODULE_TYPE = {
  GROCERY_ITEM: 'grocery_item',
  DRINK: 'drink',
  DISHES: 'dishes',
} as const;


export const GROCERY_ITEM_TYPE = {
  PROTEIN: 'protein',
  VEGETABLE: 'vegetable',
  FRUIT: 'fruit',
  CEREALS: 'cereals',
  INSTANT_FOOD: 'instant_food',
} as const;

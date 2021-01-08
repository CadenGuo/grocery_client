import { GROCERY_ITEM_TYPE } from 'common/constants';

type TGroceryItemType = typeof GROCERY_ITEM_TYPE[keyof typeof GROCERY_ITEM_TYPE];

export interface IGroceryItem {
  id: number;
  name: string;
  unit: string;
  amount: number;
  type: TGroceryItemType;
  expiration: string;
  created_at: string;
  updated_at: string;
}

export interface IDrink {
  id: number;
  name: string;
  unit: string;
  amount: number;
  carbonated: boolean;
  alcoholic: boolean;
  expiration: string;
  created_at: string;
  updated_at: string;
}

export interface IDishes {
  id: number;
  name: string;
  grocery_item: IGroceryItem[];
  complexity: number;
}
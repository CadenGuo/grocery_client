import { encodeObjectAsQueryString } from './requestSchema';
import {
  GROCERY_MODULE_TYPE,
} from 'common/constants';

const Paths = {
  ROOT: '/',
  HOME: '/home',
  GROCERY: '/grocery',
};

export interface IGroceryModulePathParam {
  type: typeof GROCERY_MODULE_TYPE[keyof typeof GROCERY_MODULE_TYPE];
}
export const generateGroceryModulePath = (pathParam: IGroceryModulePathParam) => {
  return `${Paths.GROCERY}?${encodeObjectAsQueryString(pathParam)}`;
};

export default Paths;

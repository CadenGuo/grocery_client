import { ApiFun } from '../api';
import { IPaginatedData } from './types';
export async function apiCall(api: ApiFun<object>, params: any) {
  const result = await api(params);
  return result;
}

export const EMPTY_PAGINATED_DATA: IPaginatedData = {
  count: 0,
  page: 1,
  items_per_page: 10,
  items: [],
};

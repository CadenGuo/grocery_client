import { match } from 'react-router-dom';
import { History, Location } from 'history';

export interface IBaseRouterComponent {
  match: match<any>;
  location: Location;
  history: History;
}

export interface IPaginatedData<TItem = any> {
  count: number;
  items_per_page: number;
  page: number;
  items: TItem[];
}

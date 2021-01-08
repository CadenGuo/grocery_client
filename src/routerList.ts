import Paths from './common/paths';
// Homepage
import HomePage from 'homepage/HomePage';
// Connectivity
import ConnectivityPage from 'grocery/GroceryPage';
import ConnectivitySidebar from 'grocery/Sidebar';

// Homepage
const homepageStruct = {
  exactPath: true,
  path: Paths.ROOT,
  component: HomePage,
  sideBar: null,
};

// Connectivity
const connectivityComponentStruct = {
  exactPath: true,
  path: Paths.GROCERY,
  component: ConnectivityPage,
  sideBar: ConnectivitySidebar,
};

const routerList = [
  homepageStruct,
  connectivityComponentStruct,
];

export default routerList;

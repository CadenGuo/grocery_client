import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Paths from 'common/paths';

const imageUrl = '/favicon.ico';

class NavBarLogo extends Component {
  render() {
    return (
      <Link to={Paths.HOME} className="row" style={{ cursor: 'pointer' }}>
        <img
          className="nav-bar-logo m-t-md"
          alt="logo"
          src={imageUrl}
        />
        <span className="nav-bar-title m-l-md m-r-l p-t-none m-t-none">
          Grocery Center&nbsp;
          {process.env.REACT_APP_VERSION}
        </span>
      </Link>
    );
  }
}

export default NavBarLogo;

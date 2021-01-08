import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { IBaseRouterComponent } from 'common/utils/types';
import './homepage.css';
import { generateGroceryModulePath } from 'common/paths';

type IOwnProps = IBaseRouterComponent;

interface IStateProps {
}

type Props = {};

class HomePage extends Component<Props> {
  render() {
    return (
      <div className="base-container">
        <div className="head-container">
          <div className="title-container">Grocery</div>
          <div>
            <Link to={generateGroceryModulePath({ type: 'grocery_item' })}>
              <Button className="homepage-button" size="large">View Grocery Item List</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;

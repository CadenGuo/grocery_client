import React, { Component } from 'react';
import { Button } from 'antd';
import { IBaseRouterComponent } from 'common/utils/types';
import './homepage.css';

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
            <Button className="homepage-button" size="large">View Grocery Item List</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;

import React, { Component } from 'react';
import '../CSS/historicalPage.css';
import ParseCSV from './parseCSV';
import SideNavigation from './sideNav';

class Historical extends Component {
  constructor(props){
    super(props);
    this.graphElement = React.createRef();
  }

  sideHandler = (selected) => {
    this.graphHandler(selected);
  }

  graphHandler = (selected) => {
    this.graphElement.current.setTitle(selected);
  }

  render() {
    return (
      <div className="Historical">
        <SideNavigation sideNav={this.sideHandler}/>
        <header className="Historical-header">
        </header>
        <ParseCSV ref={this.graphElement}/>
      </div>
    );
  }
}

export default Historical;
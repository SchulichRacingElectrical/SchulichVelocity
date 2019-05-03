import React, { Component } from 'react';
import '../CSS/historicalPage.css';
import ParseCSV from './parseCSV';
import SideNavigation from './sideNav';

export default class Historical extends Component {
  constructor(props) {
    super(props);
    this.graphElement = React.createRef();
    this.state = {
      selected: "",
      hideGraph: true
    }
  }

  sideHandler = (selected) => {
    this.setState({ selected: selected });
    if (selected === null || selected === "Select Data" || selected === "")
      this.setState({hideGraph: true, selected: ""});
    else
      this.setState({hideGraph: false});
    this.graphHandler(selected);
  }

  graphHandler = (selected) => {
    this.graphElement.current.setTitle(selected);
  }

  render() {
    const style = this.state.hideGraph ? {display: 'none'} : {};
    return (
      <div className="Historical">
        <SideNavigation sideNav={this.sideHandler}/>
        <div style={style}>
          <ParseCSV className="contentGraph" ref={this.graphElement}/>
        </div>
      </div>
    );
  }
}
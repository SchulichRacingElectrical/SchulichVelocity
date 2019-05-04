import React, { Component } from 'react';
import '../CSS/historicalPage.css';
import ParseCSV from './parseCSV';
import HistoricalLineGraph from './historicalLineGraph';
import SideNavigation from './sideNav';

export default class Historical extends Component {
  constructor(props) {
    super(props);
    this.graphElement = React.createRef();
    this.parser = React.createRef();
    this.state = {
      selectedGraph: "",
      hideGraph: true,
      data: []
    }
  }

  sideHandler = (selected) => {
    this.setState({ selectedGraph: selected });
    if (selected === null || selected === "Select Data" || selected === "")
      this.setState({hideGraph: true, selected: ""});
    else{
      this.setState({hideGraph: false});
      this.graphHandler(selected);
    }
  };

  graphHandler = (name) => {
    this.graphElement.current.setTitle(name);
    this.data = this.parser.current.getData(name);



    //var graphData = [];
    //this.graphElement.current.setData();
  };

  render() {
    const style = this.state.hideGraph ? {display: 'none'} : {};
    return (
      <div className="Historical">
        <SideNavigation sideNav={this.sideHandler}/>
        <ParseCSV ref={this.parser}/>
        <div style={style}>
          <HistoricalLineGraph ref={this.graphElement}/>
        </div>
      </div>
    );
  }
}
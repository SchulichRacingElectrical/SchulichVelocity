import React, { Component } from 'react';
import '../CSS/historical.css';
import ParseCSV from './parseCSV';
import HistoricalParser from './historicalParser';
import HistoricalLineGraph from './historicalLineGraph';
import SideNavigation from './sideNav';
import SelectData from './selectData';

export default class Historical extends Component {
  constructor(props) {
    super(props);
    this.graphElement = React.createRef();
    this.parser = React.createRef();
    this.historicalParser =React.createRef();
    this.searcher = React.createRef();
    this.state = {
      selectedData: "",
      selectedGraph: "",
      hideGraph: true,
      data: []
    }
  }

  getDataFromDB = async (request) => {
    await fetch('/api/request', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({post: 'historical'})
    });
    await fetch('/api/getHistoricalData',  {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({post: 'test.endurance'})
    })
    .then(response => response.json())
    .then(data => this.setState({data: data.data}));
  }

  selectHandler = async (selected) => {
    if(selected === undefined)
      return;
    selected = (Object.values(selected.dataset).join(''));
    await this.getDataFromDB(selected);
    this.historicalParser.current.parseData(this.state.data);//clean up so historical does not need a data variable
  }

  sideHandler = (selected) => {
    this.setState({ selectedGraph: selected });
    if (selected === null || selected === "Select Data" || selected === "")
      this.setState({ hideGraph: true, selected: "" });
    else {
      this.setState({ hideGraph: false });
      this.graphHandler(selected);
    }
  };

  graphHandler = (name) => {
    this.data = this.historicalParser.current.getData(name);
    this.graphElement.current.setTitle(name);
    this.graphElement.current.setData(this.data);
  };

  render() {
    const graphStyle = this.state.hideGraph ? { display: 'none' } : {};
    const searcherStyle = this.state.hideGraph ? {} : {display: 'none'};
    return (
      <div className="Historical">
          <SideNavigation sideNav={this.sideHandler} />
          <div style={graphStyle}><HistoricalLineGraph ref={this.graphElement} /></div>
          <div style={searcherStyle}><SelectData selectData={this.selectHandler} ref={this.searcher}/></div>
          <HistoricalParser ref={this.historicalParser} />
          {/* <ParseCSV ref={this.parser}/> */}
      </div>
    );
  }
}
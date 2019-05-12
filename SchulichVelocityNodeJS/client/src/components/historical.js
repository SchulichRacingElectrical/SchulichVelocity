import React, { Component } from 'react';
import '../CSS/historical.css';
import ParseCSV from './parseCSV';
import HistoricalLineGraph from './historicalLineGraph';
import SideNavigation from './sideNav';
import SelectData from './selectData';

export default class Historical extends Component {
  constructor(props) {
    super(props);
    this.graphElement = React.createRef();
    this.parser = React.createRef();
    this.searcher = React.createRef();
    this.state = {
      selectedData: "",
      selectedGraph: "",
      hideGraph: true,
      data: []
    }
  }

  getDataFromDB = async (request) => {
    const response = await fetch('/api/request', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({post: 'historical'})
    });
    const body = await response;
    console.log(body.body.post);

    const data = await fetch('/api/getHistoricalData');
    console.log(data.body.getReader().read());
  }

  selectHandler = (selected) => {
    if(selected === undefined)
      return;
    selected = (Object.values(selected.dataset).join(''));
    this.getDataFromDB(selected);
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
    this.data = this.parser.current.getData(name);
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
          <ParseCSV ref={this.parser}/>
      </div>
    );
  }
}
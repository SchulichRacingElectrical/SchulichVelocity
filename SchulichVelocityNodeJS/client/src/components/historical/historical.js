import React, { Component } from 'react';
import '../../CSS/historical.css';
import HistoricalParser from './historicalParser';
import HistoricalGraph from './historicalGraph';
import SideNavigation from '../../components/sideNav';
import SelectData from '../../components/selectData';
import ParseCSV from '../parseCSV';
import {Line, Scatter} from "react-chartjs-2";
import {Range} from "rc-slider";

let chartItems = [];
let graphs;

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
  };

  selectHandler = async (selected) => {
    if(selected === undefined)
      return;
    selected = (Object.values(selected.dataset).join(''));
    await this.getDataFromDB(selected);
    //this.historicalParser.current.parseData(this.state.data);//clean up so historical does not need a data variable
  };

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
      console.log(this.data);
      this.graphElement.current.setTitle(name);
      console.log(this.data.length);
      for (let i = 0; i < this.data.length; i++) {
          chartItems.push(this.graphElement.current.setData(this.data[i]));
      }
      this.graphElement.current = chartItems;

      console.log(chartItems);
  };

  render() {
      const graphStyle = this.state.hideGraph ? {display: 'none'} : {};
      const searcherStyle = this.state.hideGraph ? {} : {display: 'none'};
      return (
          <div className="Historical">
              <SideNavigation sideNav={this.sideHandler} />
          <div style={graphStyle}>
              <HistoricalGraph ref={this.graphElement} />
              {/*<ul>{graphs}</ul>*/}
          </div>
          <div style={searcherStyle}><SelectData selectData={this.selectHandler} ref={this.searcher}/></div>
          <ParseCSV ref={this.parser}/>
      </div>
    );
  }
}

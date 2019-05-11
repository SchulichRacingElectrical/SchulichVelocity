import React, { Component } from 'react';
import '../CSS/historicalPage.css';
import ParseCSV from './parseCSV';
import HistoricalLineGraph from './historicalLineGraph';
import SideNavigation from './sideNav';
import SelectData from './selectDataPage';

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
    const style = this.state.hideGraph ? { display: 'none' } : {};
    return (
      <div className="Historical">
        <div>
          <SideNavigation sideNav={this.sideHandler} />
          <div style={style}><HistoricalLineGraph ref={this.graphElement} /></div>
          <SelectData ref={this.searcher}/>
        </div>
        {/* <ParseCSV ref={this.parser}/> */}
      </div>
    );
  }
}
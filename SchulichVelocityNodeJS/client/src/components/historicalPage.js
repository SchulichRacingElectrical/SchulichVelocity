import React, { Component } from 'react';
import '../CSS/historicalPage.css';
import Graph from './graph';
import ParseCSV from './parseCSV';

class Historical extends Component {
  render() {
    return (
      <div className="Historical">
        <header className="Historical-header">
        </header>
        <form onSubmit={this.handleSubmit}>
          <p><br></br>Historical Data</p>
        </form>
          {/*clicking any selection from the form should return a data type*/}
          <ParseCSV/>
      </div>
    );
  }
}

export default Historical;
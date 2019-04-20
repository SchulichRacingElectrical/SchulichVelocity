import React, { Component } from 'react';
import '../CSS/historicalPage.css';
import Graph from './graph';

class Historical extends Component {
  render() {
    return (
      <div className="Historical">
        <header className="Historical-header">
        </header>
        <form onSubmit={this.handleSubmit}>
          <p><br></br>Historical Data</p>
        </form>
          <Graph/>
      </div>
    );
  }
}

export default Historical;
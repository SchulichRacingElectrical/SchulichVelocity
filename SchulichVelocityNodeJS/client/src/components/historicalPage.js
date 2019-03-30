import React, { Component } from 'react';
import './historicalPage.css'
class Historical extends Component {
  render() {
    return (
      <div className="Historical">
        <header className="Historical-header">
        </header>
        <form onSubmit={this.handleSubmit}>
          <p><br></br>Historical Data</p>
          {/*Put all other shit in here*/}
        </form>
      </div>
    );
  }
}

export default Historical;
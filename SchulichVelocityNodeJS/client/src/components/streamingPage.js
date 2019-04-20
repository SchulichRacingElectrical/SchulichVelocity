import React, { Component } from 'react';
import '../CSS/streamingPage.css';
import StreamGraph from '../components/streamGraph';

class Streaming extends Component {
  render() {
    return (
      <div className="Streaming">
        <header className="Streaming-header">
        </header>
          <p><br></br>Streaming Data</p>
          {/*put all other shit here*/}
          <StreamGraph/>
      </div>
    );
  }
}

export default Streaming;
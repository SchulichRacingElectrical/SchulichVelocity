import React, { Component } from 'react';
import '../CSS/aboutPage.css';

class About extends Component {
    componentDidMount(){
        document.title = "Schulich Velocity: About"
    }
  render() {
    return (
      <div className="Streaming">
        <header className="Streaming-header">
        </header>
        <p><br></br>About</p>
        {/*put all other shit here*/}
      </div>
    );
  }
}

export default About;
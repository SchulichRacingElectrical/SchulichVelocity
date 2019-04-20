import React, {Component} from 'react';
import '../CSS/historicalPage.css';
import Graph from './graph';

class Historical extends Component {
    componentDidMount() {
        document.title = "Schulich Velocity: Historical"
    }

    render() {
        return (
            <div className="Historical">
                <header className="Historical-header">
                </header>
                <form onSubmit={this.handleSubmit}>
                    <p><br></br>Historical Data</p>
                    <Graph/>
                </form>
            </div>
        );
    }
}

export default Historical;
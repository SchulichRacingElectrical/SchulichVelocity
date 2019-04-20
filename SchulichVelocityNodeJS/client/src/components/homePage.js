import React, {Component} from 'react';
import '../CSS/homePage.css';

class Home extends Component {
    componentDidMount() {
        document.title = "Schulich Velocity: Home"
    }

    render() {
        return (
            <div className="Home">
                <header className="Home-header">
                </header>
                <p><br></br>Home Page</p>
                <form onSubmit={this.handleSubmit}>
                </form>
            </div>
        );
    }
}

export default Home;

import React, { Component } from 'react';
import '../CSS/home.css';
import Button from 'react-bootstrap/Button';

const style = {
    fontSize: "4em"
}

class Home extends Component {
    componentDidMount() {
        document.title = "Schulich Velocity: Home"
    }

    render() {
        return (
            <div className="Home">
                <header className="Home-header">
                </header>
                <p></p>
                <div class="row">
                    <div class="col-12">
                        <img src={require("./images/logo.svg")} alt="logo" width="95%" />
                    </div>
                </div>
                <div class="jumbotron bg-white text-black">
                    <div class="container">
                        <strong><p><br></br>Welcome to Schulich Velocity!</p></strong>
                        <strong><p>This tool was created by the electrical engineering subteam
                        of the Schulich Racing Team.</p></strong>
                        <strong><p></p></strong>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <Button variant="success" size="lg">
                            <div style={style}><strong>Go to Streaming Dash</strong></div>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;

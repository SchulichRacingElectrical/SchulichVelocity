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
                        <h1>Welcome to Schulich Velocity!</h1>
                        <h3><br></br>This tool was created by the electrical engineering subteam
                        of the Schulich Racing Team.</h3>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <Button variant="danger" size="lg" href="/streaming">
                            <div style={style}><strong>Go to Streaming Dash</strong></div>
                        </Button>
                    </div>
                </div>
                <p></p>
            </div>
        );
    }
}

export default Home;

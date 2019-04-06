import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

export default class Navigation extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark" defaultActiveKey="/home" onSelect={eventKey => this.handleSubmit()}>
                <Navbar.Brand href="/"><b>Schulich Velocity</b></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Nav className="mr-auto">
                    <Nav.Item>
                        <Nav.Link eventKey="1" href="/home">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="2" href="/historical">Historical Data</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="3" href="/streaming">Streaming</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="4" href="/submitcsv">Submit a CSV File</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Nav>
                    <Nav.Item>
                        <Nav.Link eventKey="5" href="/about">About</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar>
        );
    }
}
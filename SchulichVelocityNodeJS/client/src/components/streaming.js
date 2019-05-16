import React, { Component } from 'react';
import '../CSS/streaming.css';
import StreamGraph from './streamGraph';
import SideNavigation from './sideNav';

export default class Streaming extends Component {
    constructor(props) {
        super(props);
        this.graphElement = React.createRef();
        this.state = {
            selected: "",
            hideGraph: true
        }
    }

    sideHandler = (selected) => {
        this.setState({ selected: selected });
        if (selected === null || selected === "Select Data" || selected === "")
            this.setState({ hideGraph: true, selected: "" });
        else
            this.setState({ hideGraph: false });
        this.graphHandler(selected);
    };

    graphHandler = (selected) => {
        this.graphElement.current.setTitle(selected);
    };

    render() {
        const style = this.state.hideGraph ? {display: 'none'} : {};
        return (
            <div className="Streaming">
                <SideNavigation sideNav={this.sideHandler} />
                <div style={style}>
                    <StreamGraph className="contentGraph" ref={this.graphElement}/>
                </div>
            </div>
        );
    }
}
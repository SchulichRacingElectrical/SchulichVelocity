import React, { Component } from 'react';
import '../../CSS/streaming.css';
//import StreamGraph from './streamGraph';
import SideNavigation from '../navigation/sideNav';
import StreamingDash from './streamingDash';
import {isMobile} from 'react-device-detect';
import socketIOClient from "socket.io-client";

export default class Streaming extends Component {
    constructor(props) {
        super(props);
        //this.graphElement = React.createRef();
        this.socket = "";

        this.streamDash = React.createRef();
        this.state = {
            selected: "",
            hideGraph: true,
            data: {},
        };
    }

    componentDidMount() {    // Fetch the list on first mount
        this.timerID = setInterval(() => this.tick(), 100);
        this.socket = socketIOClient("http://schulichracing.com:4001");

    }

    tick() {
        this.pullData();
        this.forceUpdate();
    }

    pullData() {
        this.socket.on("FromAPI", redis_data => this.setState({ data: redis_data }));
        this.streamDash.current.insertData(this.state.data);
        //this.graphElement.current.pushData(this.state.data);
    }

    sideHandler = (selected) => {
        this.setState({ selected: selected });
        if (selected === null || selected === "Select Data" || selected === "" || selected === "Dash")
            this.setState({ hideGraph: true, selected: "" });
        else
            this.setState({ hideGraph: false });
        this.graphHandler(selected);
    };

    graphHandler = (selected) => {
        this.graphElement.current.setTitle(selected);
    };

    render() {
        const style = this.state.hideGraph ? { display: 'none' } : {};
        const navStyle = { position: "relative", height: "100vh" };
        const dashStyle = this.state.hideGraph ? {} : {display: 'none'};
        if (isMobile) { 
            return (
                <div className="Streaming">
                    <StreamingDash ref={this.streamDash} />
                    <div style={style}>
                        {/* <StreamGraph className="contentGraph"
                            ref={this.graphElement}
                            dictionary={this.state.data} /> */}
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="Streaming" style={navStyle}>
                    <SideNavigation sideNav={this.sideHandler} />
                    <div style={style}>
                        {/* <StreamGraph className="contentGraph"
                            ref={this.graphElement}
                            dictionary={this.state.data} /> */}
                    </div>
                    <div style={dashStyle}>
                    <StreamingDash ref={this.streamDash} />
                    </div>
                </div>
            );
        }
    }
}
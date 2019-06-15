import React, { Component } from 'react';
import '../../CSS/streaming.css';
import StreamGraph from './streamGraph';
import SideNavigation from '../navigation/sideNav';
import StreamingDash from './streamingDash';
import StreamingParser from './streamingParser';

export default class Streaming extends Component {
    constructor(props) {
        super(props);
        this.graphElement = React.createRef();
        this.streamDash = React.createRef();
        this.streamParser = React.createRef();
        this.state = {
            selected: "",
            hideGraph: true,
            data: {}
        };
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

    getData = async (request) => {
        this.state.data = await fetch('/api/getStreamingData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({post: ''})
        })
        .then(function(response){return response.json()})
        .then(function(body){console.log(body)});
        
            // .then(response => response.json())
            // .then(data => console.log(data));
            // .then(data => this.setState({data: data.data}));
    }

    render() {
        const style = this.state.hideGraph ? { display: 'none' } : {};
        const dashStyle = this.state.hideGraph ? {} : {display: 'none'};
        console.log(this.state.data);
        return (
            <div className="Streaming">
                <SideNavigation sideNav={this.sideHandler} />
                <div style={style}><StreamGraph className="contentGraph" 
                ref={this.graphElement} 
                dictionary={this.state.data}/>
                </div>
                <div style={dashStyle}>
                    <StreamingDash ref={this.streamDash}/>
                </div>
                <StreamingParser ref={this.StreamingParser}/>
            </div>
        );
    }
}
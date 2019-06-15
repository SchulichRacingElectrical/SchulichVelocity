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
    // Fetch the list on first mount
    componentDidMount() {
        this.timerID = setInterval(() => this.tick(),100);
    }
    tick() {
        this.pullData();
    }
    
    pullData(){
        fetch('/api/getData', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({post: ''})
        })
        .then(function(response){return response.json()})
        .then(body => this.setState({data: body}));
        this.streamDash.insertData(this.state.data)
        this.forceUpdate();
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
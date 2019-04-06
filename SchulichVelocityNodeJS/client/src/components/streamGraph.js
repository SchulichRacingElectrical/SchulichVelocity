import React from 'react';

export default class streamGraph extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            xData: [],
            yData: [],
            xTitle: '',
            yTitle: '', 
            title: '', 
            type: ''
        }
    }

    pullData() {

    }

    tick() {
        pullData();
    }

    componentdidMount() {
        this.timerID = setInterval(
            () => this.tick(), 
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        return(
            <div>

            </div>
        )
    }
}
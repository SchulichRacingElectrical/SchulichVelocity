import React from 'react';

export default class Graph extends React.Component {
    constructor(props) {
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

    componentDidMount(){

    }

    componentWillUnmount(){

    }
    
    render() { 
        return(
            <div class="graph">

            </div>
        );
    }
}
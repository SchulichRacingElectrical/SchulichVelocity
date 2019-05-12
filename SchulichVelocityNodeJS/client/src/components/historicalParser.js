import React, { Component } from 'react';

export default class HistoricalParser extends Component {
    constructor(props) {
        super(props);

        this.datasets = [{
            label: '',
            data: []
        }]
    }

    parseData = (historicalData) => {
        //console.log(historicalData);
        for(const result in historicalData){
            if(!historicalData.hasOwnProperty(result)) continue;
            var dataset = historicalData[result];
            for(const datum in dataset){
                if(!dataset.hasOwnProperty(datum)) continue;
                console.log(obj[datum]);
            }
        }
    }

    getData() {

    }

    render() {
        return(<div></div>);
    }
}
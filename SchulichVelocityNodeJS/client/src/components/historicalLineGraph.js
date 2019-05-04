import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';

export default class HistoricalLineGraph extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            labels: [],
            datasets: []
        };
        this.options = {
            layout: {
                padding: {
                    left: 80,
                    right: 30,
                    top: 0,
                    bottom: 0
                }
            },
            animation: {
                duration: 0
            },
            title: {
                display: true,
                fontSize: 30,
                text: ''
            }
        }
    }

    setTitle = (selected) => {
        if(selected !== null && selected !== "Select Data")
            this.options.title.text = selected;
        this.setState({state: this.state})
    };

    setData = (data) => {

        let colorArray = ['rgb(255, 0, 0)', 'rgb(0, 255, 0)', 'rgb(0, 0, 255)',
                          'rgb(255, 255, 0)', 'rgb(0, 255, 255)', 'rgb(255, 0, 255)'];

        //Clear previous data
        this.state.labels = [];
        this.state.datasets = [];

        //Push in new data
        this.state.labels = data[0].data;
        for(let i = 1; i < data.length; i++) {
            console.log(data[i].data);
            console.log(data[i].label);
            this.state.datasets.push( {
                data : data[i].data,
                label: data[i].label,
                borderColor: colorArray[i - 1],
                pointRadius: 1,
                backgroundColor: 'rgba(0,0,0,0.0)',
                lineTension: 0,
            })
        }
        this.forceUpdate();
    };

    render() {
        return (
            <div>
                <Line data={this.state} options={this.options}/>
            </div>
        )
    }
}
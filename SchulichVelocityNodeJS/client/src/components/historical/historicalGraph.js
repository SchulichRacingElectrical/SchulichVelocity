import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';

export default class HistoricalGraph extends Component {
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
                    right: 20,
                    top: 0,
                    bottom: 0
                }
                
            },
            elements: {
                line: {
                    tension: 0
                }
            },
            tooltips: {
                enabled: false
            },
            animation: {
                duration: 0
            },
            hover : {
                animationDuration: 0
            },
            title: {
                display: true,
                fontSize: 30,
                text: ''
            }
        };
    }

    setTitle = (selected) => {
        if(selected !== null && selected !== "Select Data")
            this.options.title.text = selected;
        this.setState({state: this.state})
    };

    setData = (data) => {
        let colorArray = ['rgb(255, 0, 0)', 'rgb(0, 255, 0)', 'rgb(0, 0, 255)',
                          'rgb(255, 255, 0)', 'rgb(0, 255, 255)', 'rgb(255, 0, 255)'];
        let i = 1;
        //Clear previous data
        this.state.labels = [];
        this.state.datasets = [];
        //Push in new data
        if(data[0] === "Line") {
            this.state.labels = data[1].data;
            i = 2;
        }
        console.log(i);

        for(i; i < data.length; i++) {
            this.state.datasets.push( {
                data : data[i].data,
                label: data[i].label,
                borderColor: colorArray[i - 1],
                pointRadius: 0.5,
                borderWidth: 2,
                showLine: true,
                backgroundColor: 'rgba(0,0,0,0.0)',
                lineTension: 0
            })
        }
        console.log(this.state);
        this.setState({state: this.state});
    };

    resize(smaller) {
        if(smaller === true)
            this.options.layout.padding = 240;
        else
            this.options.layout.padding = 80;
    }

    render() {
        return (
            <div>
                <Line data={this.state} options={this.options}/>
            </div>
        )
    }
}

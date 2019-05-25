import React, { Component } from 'react';
import { Line, Scatter } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';

let chartType = "Line";

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
        //Clear previous data
        this.state.labels = [];
        this.state.datasets = [];
        //Push in new data
        if(data[0] === "Line") {
            chartType = "Line";
            this.state.labels = data[1].data;
            for(let i = 2; i < data.length; i++) {
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
        }
        else if(data[0] === "Scatter") {
            chartType = "Scatter";
            this.ScatterData = {
                datasets: [{
                    data: [],
                    fill: false,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                }]
            };
            for(let i = 1; i < data[1].data.length; i++) {
                if (data[1].data[i] !== 0 && data[2].data[i] !== 0)
                this.ScatterData.datasets[0].data.push({
                    x: data[1].data[i],
                    y: data[2].data[i]
                })
            }
        }
        this.setState({state: this.state});
        console.log(this.ScatterData);
    };

    resize(smaller) {
        if(smaller === true)
            this.options.layout.padding = 240;
        else
            this.options.layout.padding = 80;
    }

    render() {
        if (chartType === "Line")
            return (
                <div>
                     <Line data={this.state} options={this.options}/>
                </div>
        );
        else if (chartType === "Scatter")
            return (
                <div>
                    <Scatter data={this.ScatterData} options={this.options}/>
                </div>
            );
    }
}

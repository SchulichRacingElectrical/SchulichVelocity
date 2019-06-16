import React, { Component } from 'react';
import { Line, Scatter } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';

export default class HistoricalLineGraph extends Component {
    constructor(props){
        super(props);
        this.state = {
            chartType: "Line",
            value: [0, 0],
            originalLineData: {
                labels: [],
                datasets: [{
                    data: []
                }]
            },
            originalScatterData: {
                labels: [],
                datasets: [{
                    data: []
                }]
            },
            lineData: {},
            scatterData: {}
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
        this.state = {
                chartType: "Line",
                value: [0, 0],
                originalLineData: {
                    labels: [],
                    datasets: [{
                        data: []
                    }]
                },
                originalScatterData: {
                    labels: [],
                    datasets: [{
                        data: []
                    }]
                },
                lineData: {},
                scatterData: {}
        };
        if(data[0][0] === "line") { //clean up, currently sending several copies of data
            this.state.originalLineData.data = [];
            this.state.originalLineData.labels = data[0][1].data;
            for(let i = 2; i < data[0].length; i++) {
                this.state.originalLineData.datasets.push({
                    data : data[0][i].data,
                    label: data[0][i].label,
                    borderColor: colorArray[i - 2],
                    pointRadius: 0.5,
                    borderWidth: 2,
                    showLine: true,
                    backgroundColor: 'rgba(0,0,0,0.0)',
                    lineTension: 0
                });
            }
            this.state.originalLineData.datasets.splice(0, 1);
            this.setState({chartType: "Line"});
            this.setState({lineData: this.state.originalLineData,
                                originalLineData: this.state.originalLineData});
            this.forceUpdate();
        }
        else if(data[0][0] === "scatter") {
            this.state.originalScatterData = {
                labels: 'Points',
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
                    pointHitRadius: 10
                }],
            };
            for(let i = 0; i < data[0][1].data.length; i++) {
                if (!(isNaN(data[0][2].data[i]) || isNaN(data[0][3].data[i]))
                    && (data[0][2].data[i] !== 0 || data[0][3].data[i] !== 0)) {
                    this.state.originalScatterData.datasets[0].data.push({
                        x: data[0][2].data[i],
                        y: data[0][3].data[i]
                    });
                }
            }
            this.state.originalLineData.datasets.splice(0, 1);
            this.setState({scatterData: this.state.originalScatterData});
            this.setState({chartType: "Scatter"});
        }
        this.setState({state: this.state});
    };

    render() {
        if(this.state.chartType === "Line"){
            return (
                <div>
                    <Line data={this.state.lineData} options={this.options}/>
                </div>
            );
        }
        else if(this.state.chartType === "Scatter"){
            return (
                <div>
                    <Scatter data={this.state.scatterData} options={this.options}/>
                </div>
            );
        }
        else{
            return (
                <div>
                    <h1>Error: Chart type not specified.</h1>
                </div>
            );
        }
    }
}
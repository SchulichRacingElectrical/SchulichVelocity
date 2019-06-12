import React, { Component } from 'react';
import { Line, Scatter } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';

let chartData = 0;

export default class HistoricalLineGraph extends Component {
    constructor(props){
        super(props);
        this.state = {
            //min: 0,
            //max: 100,
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
            //labels: [],
            //datasets: []
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
        // //Clear previous data
        // this.state.labels = [];
        // this.state.datasets = [];
        // //Push in new data
        // this.setState({labels: data[0].data});
        // console.log(data.length);
        // for(let i = 1; i < data.length; i++) {
        //     this.state.datasets.push( {
        //         data : data[i].data,
        //         label: data[i].label,
        //         borderColor: colorArray[i - 1],
        //         pointRadius: 0.5,
        //         borderWidth: 2,
        //         showLine: true,
        //         backgroundColor: 'rgba(0,0,0,0.0)',
        //         lineTension: 0
        //     })
        // }
        // this.setState({state: this.state});
        chartData = data;

        //this.state.min = data[1].data[0];
        //this.state.max = data[1].data[data[1].data.length - 2];
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
        //Need to fix undefined label being displayed on graphs.
        if(data[0][0] === "line") { //clean up, currently sending several copies of data
            this.state.originalLineData.data = [];
            this.state.originalLineData.labels = data[0][1].data;
            for(let i = 2; i < data[0].length; i++) {
                console.log(data[0][i].label)
                console.log(i);
                this.state.originalLineData.datasets.push( {
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
            this.setState({chartType: "Line"});
            this.setState({lineData: this.state.originalLineData,
                                originalLineData: this.state.originalLineData});
            this.forceUpdate();
            console.log(this.state.lineData);
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
            this.setState({scatterData: this.state.originalScatterData});
            this.setState({chartType: "Scatter"});
        }
        this.setState({state: this.state});
    };

    resize(smaller) {
        if(smaller === true)
            this.options.layout.padding = 240;
        else
            this.options.layout.padding = 80;
    }

    render() {
        if(this.state.chartType === "Line"){
            return (
                <div>
                    <Line data={this.state.lineData} options={this.options}/>
                </div>
            )
        }
        else if(this.state.chartType === "Scatter"){
            return (
                <div>
                    <Scatter data={this.state.scatterData} options={this.options}/>
                </div>
            )
        }
        else{
            return (
                <div>
                    <h1>Error: Chart type not specified.</h1>
                </div>
            )
        }
    }
}
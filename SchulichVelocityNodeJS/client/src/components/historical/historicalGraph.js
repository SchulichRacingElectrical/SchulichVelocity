import React, { Component } from 'react';
import { Line, Scatter } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';
import Slider,{ Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

let chartType = "Line";
let chartData = 0;
let minInterval;
let maxInterval;
let min;
let max;
let originalLineData = {};
let originalScatterData = {};

export default class HistoricalGraph extends Component {
    constructor(props){
        super(props);

        this.state = {
            min: 0,
            max: 100,
            value: [0, 0],
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
        chartData = data;

        minInterval = data[1].data[0];
        maxInterval = data[1].data[data[1].data.length - 2];

        min = minInterval;
        max = maxInterval;

        if(data[0] === "Line") {
            chartType = "Line";
            originalLineData ={
                labels: [],
                datasets: []
            };
            originalLineData.labels = data[1].data;
            for(let i = 2; i < data.length; i++) {
                originalLineData.datasets.push( {
                    data : data[i].data,
                    label: data[i].label,
                    borderColor: colorArray[i - 2],
                    pointRadius: 0.5,
                    borderWidth: 2,
                    showLine: true,
                    backgroundColor: 'rgba(0,0,0,0.0)',
                    lineTension: 0
                })
            }
            this.setState({lineData: originalLineData});
        }

        else if(data[0] === "Scatter") {
            chartType = "Scatter";
            originalScatterData = {
                labels: 'Points',
                datasets: [{
                    data: [
                    ],
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
            console.log(data);
            for(let i = 0; i < data[1].data.length; i++) {
                if (!(isNaN(data[2].data[i]) || isNaN(data[3].data[i]))
                    && (data[2].data[i] !== 0 || data[3].data[i] !== 0)) {
                    originalScatterData.datasets[0].data.push({
                        x: data[2].data[i],
                        y: data[3].data[i]
                    });
                }
            }
            this.setState({scatterData: originalScatterData});
        }
        // console.log(lineData);
        // console.log(scatterData);
    };

    rescale(value) {
        console.log('');
    };

    resize(smaller) {
        if(smaller === true)
            this.options.layout.padding = 240;
        else
            this.options.layout.padding = 80;
    };

    rangeIndicatorUpdate = value => {
        return <p> Current range: {value} </p>
    };

    rangeUpdate = (value) => {

        //this.rangeIndicatorUpdate(value);

        this.setState({value});
        console.log(value);

        if (chartType === "Line") {

            this.setState({
                lineData: originalLineData
            });

            for(let i = 0; i < originalLineData.labels.length; i++) {
                if (i < value[0]) {
                    this.state.lineData.labels[i] = NaN;
                    for (let j = 0; j < originalLineData.datasets.length; j++) {
                        this.state.lineData.datasets[j].data[i] = NaN;
                    }
                }
                if (i > value[1]) {
                    this.state.lineData.labels[i] = NaN;
                    for (let j = 0; j < originalLineData.datasets.length; j++) {
                        this.state.lineData.datasets[j].data[i] = NaN;
                    }
                }
            }
            this.setState({
                lineData: this.state.lineData
            });

            this.forceUpdate();

            console.log(originalLineData);
            console.log(this.state.lineData);
        }

        else if (chartType === "Scatter") {

        }

    };


    render() {
        if (chartType === "Line")
            return (
                <div>
                    <Line data={this.state.lineData} options={this.options}/>
                    <Range
                        step={20}
                        min={minInterval}
                        max={maxInterval}
                        allowCross={true}
                        defaultValue={[minInterval, maxInterval]}
                        onAfterChange={this.rangeUpdate}
                        pushable={1000}
                    />
                </div>
        );
        else if (chartType === "Scatter")
            return (
                <div>
                    <Scatter data={this.state.scatterData} options={this.options}/>
                </div>
            );
        else
            return (
                <div>
                    <h1>Error: Chart type not specified.</h1>
                </div>
            );
    }
}

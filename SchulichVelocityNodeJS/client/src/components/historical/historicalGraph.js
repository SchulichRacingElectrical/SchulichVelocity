import React, { Component } from 'react';
import { Line, Scatter } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';
import Slider,{ Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

let chartType = "Line";
let chartData = 0;

export default class HistoricalGraph extends Component {
    constructor(props){
        super(props);

        this.state = {
            min: 0,
            max: 100,
            value: [0, 0],
            originalLineData: {
                labels: [],
                datasets: [{
                    data: []
                }],
            },
            originalScatterData: {
                labels: [],
                datasets: [{
                    data: []
                }],
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
        chartData = data;

        this.state.min = data[1].data[0];
        this.state.max = data[1].data[data[1].data.length - 2];

        if(data[0] === "Line") {
            chartType = "Line";
            this.state.originalLineData.data = [];
            this.state.originalLineData.labels = data[1].data;

            for(let i = 2; i < data.length; i++) {
                this.state.originalLineData.datasets.push( {
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
            this.setState({lineData: this.state.originalLineData,
                                originalLineData: this.state.originalLineData});
        }

        else if(data[0] === "Scatter") {
            chartType = "Scatter";
            this.state.originalScatterData = {
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
                    this.state.originalScatterData.datasets[0].data.push({
                        x: data[2].data[i],
                        y: data[3].data[i]
                    });
                }
            }
            this.setState({scatterData: this.state.originalScatterData});
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
                lineData: this.state.originalLineData
            });

            for(let i = 0; i < this.state.originalLineData.labels.length; i++) {
                if (this.state.originalLineData.labels[i] < value[0]) {
                    this.state.lineData.labels.shift();
                    for (let j = 0; j < this.state.originalLineData.datasets.length; j++) {
                        this.state.lineData.datasets[j].data.shift();
                    }
                }
                if (this.state.originalLineData.labels[i] > value[1]) {
                    this.state.lineData.labels.pop();
                    for (let j = 0; j < this.state.originalLineData.datasets.length; j++) {
                        this.state.lineData.datasets[j].data.pop();
                    }
                }
            }
            console.log([this.state.originalLineData, 'orginal Line Data']);
            console.log([this.state.lineData, 'line data']);
            //this.state.lineData.forceUpdate();
            this.setState({
                lineData: this.state.lineData
            });
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
                        min={this.state.min}
                        max={this.state.max}
                        allowCross={true}
                        defaultValue={[this.state.min, this.state.max]}
                        onAfterChange={this.rangeUpdate}
                        pushable={2000}
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

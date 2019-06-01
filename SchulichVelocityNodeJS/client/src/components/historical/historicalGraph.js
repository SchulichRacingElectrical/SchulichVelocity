import React, { Component } from 'react';
import { Line, Scatter } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

let chartType = "Line";
let chartData = 0;
let minInterval = 0;
let maxInterval = 1000;
let min = 100;
let max = 500;
let lineData = [{
    labels: [],
    datasets: []
}];
let scatterData = [{
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
}];

export default class HistoricalGraph extends Component {
    constructor(props){
        super(props);
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

        if(data[0] === "Line") {
            chartType = "Line";
            lineData.labels = data[1].data;
            for(let i = 2; i < data.length; i++) {
                lineData.datasets.push( {
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
            return lineData
        }
        else if(data[0] === "Scatter") {
            chartType = "Scatter";
            for(let i = 1; i < data[1].data.length; i++) {
                if (data[2].data[i] !== 0 && data[3].data[i] !== 0)
                scatterData.datasets[0].data.push({
                    x: data[2].data[i],
                    y: data[3].data[i]
                })
            }
            return scatterData;
        }


        // console.log(lineData);
        // console.log(scatterData);
    };



    rescale(value) {
        console.log('');
    }

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
                    <Line data={lineData} options={this.options}/>
                    <p>range (0, 1000)</p>
                    <Range
                        step={20}
                        min={minInterval}
                        max={maxInterval}
                        allowCross={true}
                        defaultValue={[minInterval, maxInterval]}
                    />
                </div>
        );
        else if (chartType === "Scatter")
            return (
                <div>
                    <Scatter data={scatterData} options={this.options}/>
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

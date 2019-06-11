import React, { Component } from 'react';
import {Line, Scatter} from 'react-chartjs-2';
import 'chartjs-plugin-streaming';

let chartType = "Line";

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default class StreamGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLabel: 3,
            labels: [],
            datasets: [{
                data: [],
                borderColor: 'rgb(255, 0, 0)',
                pointRadius: 1,
                backgroundColor: 'rgba(0,0,0,0.0)',
                lineTension: 0,
            }]
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
            },
            responsive: true,
            scales: {
                xAxes: [{
                    realtime: {
                        onRefresh: function (chart) { },
                    }
                }]
            }
        }
    }

    pullData() {
        this.state.labels.push(this.state.currentLabel.toString());
        this.state.datasets[0].data.push(getRandomInt(0, 10));
        this.setState({ currentLabel: this.state.currentLabel + 1 });

        if(this.state.labels.length > 50) {
            this.state.datasets[0].data.shift();
            this.state.labels.shift();
        }
    }

    tick() {
        this.pullData();
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(),200);
    }

    setTitle = (selected) => {
        if(selected !== null && selected !== "Select Data")
            this.options.title.text = selected;
        this.setState({state: this.state})
    };

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
        else
            return (
            <div>
                <h1>Error: Chart type not specified.</h1>
            </div>
            );
    }
}

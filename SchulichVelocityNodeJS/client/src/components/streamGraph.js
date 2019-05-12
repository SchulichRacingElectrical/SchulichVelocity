import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default class StreamGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLabel: 3,
            labels: ['0', '1', '2'],
            datasets: [{
                data: [1, 2, 3],
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
    }

    render() {
        return (
            <div>
                <Line data={this.state} options={this.options} />
            </div>
        )
    }
}
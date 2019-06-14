import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';

export default class StreamGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // currentLabel: 3,
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
        this.state.labels.push(this.props.dictionary.Utc);
        this.state.datasets[0].data.push(this.props.dictionary.Rpm);
        //this.setState({ currentLabel: this.state.currentLabel + 1 });
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
        this.setState({state: this.state});
    }

    render() {
        return (
            <div>
                <Line data={this.state} options={this.options} />
            </div>
        )
    }
}
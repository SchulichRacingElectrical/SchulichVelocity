import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default class StreamGraph extends Component {
    constructor(props) {
        super(props);
        this.titles = [];
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
            title: {
                display: true,
                fontSize: 30,
                text: ''
            },
            responsive: true,
            scales: {
                xAxes: [{
                    realtime: {
                        duration: 20000,
                        onRefresh: function (chart) { },
                    }
                }]
            }, 
            plugins: {
                streaming: {
                    frameRate: 30
                }
            }
        }
    }

    pullData = () => {
        this.state.labels.push(this.state.currentLabel.toString());
        this.state.datasets[0].data.push(getRandomInt(0, 50));
        this.setState({ currentLabel: this.state.currentLabel + 1});
        if(this.state.currentLabel - 100 > this.state.labels[0]){
            this.state.datasets[0].data.shift();
            this.state.labels.shift();
        }

        // await fetch('/api/request', {
        //     method: 'POST', 
        //     headers: {
        //       'Content-Type': 'application/json',
        //     }, 
        //     body: JSON.stringify({post: 'streaming'})
        // });

        // await fetch('/api/getStreamingData', {
        //     method: 'POST', 
        //     headers: {
        //       'Content-Type': 'application/json',
        //     }, 
        //     body: JSON.stringify({post: ''})
        // })
        // .then(response => response.json())
        // .then(data => 
        //     //parse out the data then determine the page we are on
        //     this.state.datasets[0].data.push(data)
        // );
    }

    tick() {
        this.pullData();
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(),33);
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
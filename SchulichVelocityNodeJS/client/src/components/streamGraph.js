import React, {Component} from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class StreamGraph extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentLabel: 3,
            labels: ['0', '1', '2'],
            datasets: [{
                data: [1, 2, 3],
                borderColor: 'rgb(255, 0, 0)',
                backgroundColor: 'rgba(0,0,0,0.0)',
                lineTension: 0,
            }]
        }
    }

    pullData() {

        this.state.labels.push(this.state.currentLabel.toString());
        this.state.datasets[0].data.push(getRandomInt(0, 10));
        this.setState({currentLabel: this.state.currentLabel + 1});

        if (this.state.currentLabel - 60 > this.state.labels[0]) {
            this.state.labels.shift();
            this.state.datasets[0].data.shift();
        }
    }

    tick() {
        this.pullData();
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            200
        );
    }

    render() {
        return(
            <div>
                <Line data={this.state}
                    options={{
                        animation: {
                            duration: 0
                        },
                        responsive: true,
                        scales: {
                            xAxes: [{
                               realtime: {
                                   onRefresh: function(chart) {},
                                }
                            }]
                        },
                    }}
                />
            </div>
        )
    }
}

export default StreamGraph;
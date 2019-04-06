import React, {Component} from 'react';
import { Line } from 'react-chartjs-2';
//import 'chartjs-plugin-streaming';

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class streamGraph extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentLabel: 1,
            xData: [],
            yData: [], 
            labels: xData, 
            datasets: [{
                data: yData, 
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(0,0,0,0.0)',
                lineTension: 0,
            }]
        }
    }

    pullData() {

        this.state.yData.push(getRandomInt(0, 10));
        this.state.xData.push(this.state.currentLabel.toString());
        this.state.currentLabel++;

        if (this.state.currentLabel - 50 > x[0]) {
            this.state.xData.shift();
            this.state.yData.shift();
        }
    }

    tick() {
        this.state.pullData();
        this.setState({state: state});
    }

    componentdidMount() {
        this.timerID = setInterval(
            () => this.tick(), 
            200
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        return(
            <div>
                <Line data={this.state}
                    options={{
                       responsive: true,
                       scales: {
                          xAxes: [{
                                realtime: {
                                    onRefresh: function(chart) {},
                                }
                            }]
                        }
                    }}
                />
                <button></button>
            </div>
        )
    }
}

export default streamGraph;
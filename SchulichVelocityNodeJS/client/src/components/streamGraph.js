import React from 'react';
import { Line } from 'react-chartjs-2';
//import 'chartjs-plugin-streaming';

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default class streamingGraph extends React.Component {
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
                lineTension: 0
            }]
        }
    }

    pullData() {
        yData.push(getRandomInt(0, 10));
        xData.push(currentLabel.toString());
        currentLabel++;

        if (currentLabel - 50 > x[0]) {
            xData.shift();
            yData.shift();
        }
    }

    tick() {
        pullData();
        this.setState({state: state});
    }

    componentdidMount() {
        this.timerID = setInterval(
            () => this.tick(), 
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        return(
            <div>
                <Line data={this.state}
                    //options={{
                    //    responsive: true;
                    //    scales: {
                    //       xAxes: [{
                    //             realtime: {
                    //                 onRefresh: function(chart) {},
                    //             }
                    //         }]
                    //     }
                    // }}
                />
                <button onclick></button>
            </div>
        )
    }
}
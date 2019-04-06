import React, {Component} from 'react';
import { Line } from 'react-chartjs-2';

let x = ['1', '2','3'];
let y = ['1', '2', '3'];

const getState = () => (
    {
        labels: x,
        datasets: [{
            data: y,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(0,0,0,0.0)',
            lineTension: 0,
        }]
    }
);

class Graph extends Component {

    componentDidMount() { //this will for checking if data has changed --do later
        setInterval( () => {
            this.setState(getState());
            }, 200);
    }

    componentWillUnmount() {
        //unyeet
    }

    render() {
        return (
            <div>
                <Line data={this.state}
                    options={{}}
                />
                <button>butt</button>
            </div>
        );
    }
}

export default Graph;
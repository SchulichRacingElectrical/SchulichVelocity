import React, {Component} from 'react';
import { Line } from 'react-chartjs-2';
import { CSVReader } from 'react-papaparse';


let x = ['1', '2','3'];
let y = [1, 3, 2];

class Graph extends Component {

    render() {
        return (
            <div>
                <Line data={this.props.data}
                    options={{}}
                />
                <button>butt</button>
            </div>
        );
    }
}

export default Graph;
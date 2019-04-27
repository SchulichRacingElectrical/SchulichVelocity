import React, { Component } from 'react';
import { CSVReader } from 'react-papaparse';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';
import {forEach} from "react-bootstrap/es/utils/ElementChildren";

// 1. choose xData
// 2. choose yDatas, since we can choose more than one
// 3. parse and present
// this allows the user to be able to see very custom charts

let intervals = [];
let yData = [];

function createPlots(data) {
    for(let i = 0; i < data.length; i++) {
        intervals[i] = data[i].Interval; //Interval = time header
        yData[i] = parseInt(data[i].Speed, 10);
    }

    return [intervals, yData];
}

class ParseCSV extends Component {
    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
        this.chartData = {
            labels: [],
            datasets: [{
                data: [],
                borderColor: 'rgb(255, 0, 0)',
                backgroundColor: 'rgba(0,0,0,0.0)',
                lineTension: 0,
            }]
        };
    }

    handleReadCSV = (data) => {

        for(let i = 0; i < data.data.length; i++) {
            this.chartData.labels[i] = data.data[i].Interval; //Interval = time header
            this.chartData.datasets[0].data[i] = parseInt(data.data[i].Speed, 10);
        }

        console.log(data.data);

        //let result = createPlots(data.data);
        //this.chartData.labels = result[0];
        //this.chartData.datasets[0].data = result[1];

        this.forceUpdate();
    };

    handleOnError = (err, file, inputElem, reason) => {
        console.log(err);
    };

    handleImportOffer = () => {
        this.fileInput.current.click();
        this.setState(this.state, this.state);
    };

    render() {
        return (
            <div>
                <CSVReader
                    onFileLoaded={this.handleReadCSV}
                    inputRef={this.fileInput}
                    style={{display: 'none'}}
                    onError={this.handleOnError}
                    configOptions={{header: true,
                    delimiter: ',' }}
                />
                <button onClick={this.handleImportOffer}>Import</button>
                <Line data={this.chartData} />
            </div>
        );
    }
}

export default ParseCSV;
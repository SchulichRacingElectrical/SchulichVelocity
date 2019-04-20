import React, { Component } from 'react';
import { CSVReader } from 'react-papaparse';
import { Line } from 'react-chartjs-2';

let xData = [];
let yData = [];

let graphData = {
    currentLabel: 3,
    labels: xData,
    datasets: [{
        data: yData,
        borderColor: 'rgb(255, 0, 0)',
        backgroundColor: 'rgba(0,0,0,0.0)',
        lineTension: 0,
    }]
};

function createPlots(data) {
    for(let i = 0; i < data.length; i++) {
        xData[i] = data[i].Interval; //time header
        yData[i] = parseInt(data[i].Speed, 10); //other datatype header
    }
}

class ParseCSV extends Component {
    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
    }

    handleReadCSV = (data) => {
        //console.log(data);
        console.log(data.data);
        createPlots(data.data);

        console.log(xData);
        console.log(yData);
    };

    handleOnError = (err, file, inputElem, reason) => {
        console.log(err);
    };

    handleImportOffer = () => {
        this.fileInput.current.click();
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

                <Line data={graphData}/>
            </div>
        );
    }
}

export default ParseCSV;
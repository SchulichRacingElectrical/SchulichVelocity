import React, { Component } from 'react';
import { CSVReader } from 'react-papaparse';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';

export default class ParseCSV extends Component {
    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
        this.dataCSV = [{
            label: [],
            data: []
        }]
    }

    handleReadCSV = (data) => {

        for (let i = 0; i < data.meta.fields.length; i++) {
            this.dataCSV.push({
                data: [],
                label: data.meta.fields[i]
            });
            for(let j = 0; j < data.data.length; j++) {
                this.dataCSV[i + 1].data.push(parseFloat(data.data[j][data.meta.fields[i]]));
            }
        }

        console.log(data);
        console.log(this.dataCSV);

    };

    handleOnError = (err, file, inputElem, reason) => {
        console.log(err);
    };

    handleImportOffer = () => {
        this.fileInput.current.click();
        this.setState({state: this.state});
    };

    getData(name, data) {

        let headerArray = [];
        let dataArrays = [];

        if (name === 'Suspension') {
            headerArray = ['RearRight', 'RearLeft', 'FrontLeft', 'FrontRight'];
        }
        else if (name === 'Acceleration') {
            headerArray = ['AccelX', 'AccelY', 'AccelZ']; 
        };

        for(let i = 1; i < data.meta.fields.length; i++) {
            for(let j = 0; j < headerArray.length; j++) {
                if(headerArray[j] === this.dataCSV.label) {
                    dataArrays.push(this.dataCSV[i]);
                }
            }
        }

        return dataArrays;

    }

    render() {
        return (
            <div>
                <CSVReader
                    onFileLoaded={this.handleReadCSV}
                    inputRef={this.fileInput}
                    style={{display: 'none'}}
                    onError={this.handleOnError}
                    configOptions={{header: true,
                                    delimiter: ','
                    }}
                />
            </div>
        );
    }
}
import React, { Component } from 'react';
import { CSVReader } from 'react-papaparse';
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
    };

    handleOnError = (err, file, inputElem, reason) => {
        console.log(err);
    };

    handleImportOffer = () => {
        this.fileInput.current.click();
        this.setState({state: this.state});
    };

    getData(name) {
        let headerArray = [];
        let dataArrays = [];
        dataArrays.push(this.dataCSV[1]);

        if (name === "Suspension") {
            headerArray = ["RearRight", "RearLeft", "FrontLeft", "FrontRight"];
        }
        else if (name === "Acceleration") {
            headerArray = ["AccelX", "AccelY", "AccelZ"];
        }
        else if (name === "Engine Temperature") {
            headerArray = ["EngineTemp"];
        }
        else if (name === "Oil Temperature") {
            headerArray = ["OilTemp"];
        }
        else if (name === "Oil Pressure") {
            headerArray = ["OilPressure"];
        }
        else if (name === "Barometer") {
            headerArray = ["Baro"];
        }
        else if (name === "Fuel Temperature") {
            headerArray = ["FuelTemp"];
        }
        else if (name === "Manifold Air Pressure") {
            headerArray = ["MAP"];
        }
        else if (name === "Intake Air Temperature") {
            headerArray = ["IAT"];
        }
        else if (name === "Injector Pulse Width") {
            headerArray = ["InjectorPW"];
        }
        else {
            headerArray = [name];
        }

        for(let i = 0; i < this.dataCSV.length; i++) {
            for(let j = 0; j < headerArray.length; j++) {
                if(headerArray[j] === this.dataCSV[i].label) {
                    dataArrays.push(this.dataCSV[i]);
                }
            }
        }
        console.log(dataArrays);
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
                <button onClick={this.handleImportOffer}>Upload CSV</button>
            </div>
        );
    }
}
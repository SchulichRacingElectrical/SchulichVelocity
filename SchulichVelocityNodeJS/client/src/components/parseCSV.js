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
            for(let j = 0; j < data.data.length; j++) 
                this.dataCSV[i + 1].data.push(parseFloat(data.data[j][data.meta.fields[i]]));
        }
        console.log(this.dataCSV);
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

        if      (name === "Suspension")
            headerArray = ["Line", "Interval", "RearRight", "RearLeft", "FrontLeft", "FrontRight"];
        else if (name === "Acceleration v Time")
            headerArray = ["Line", "Interval", "AccelX", "AccelY", "AccelZ"];
        else if (name === "Acceleration Scatter")
            headerArray = ["Scatter", "AccelX", "AccelY", "AccelZ"];
        else if (name === "Engine Temperature")
            headerArray = ["Line", "Interval", "EngineTemp"];
        else if (name === "Oil Temperature")
            headerArray = ["Line", "Interval", "OilTemp"];
        else if (name === "Oil Pressure")
            headerArray = ["Line", "Interval", "OilPressure"];
        else if (name === "Barometer")
            headerArray = ["Line", "Interval", "Baro"];
        else if (name === "Fuel Temperature")
            headerArray = ["Line", "Interval", "FuelTemp"];
        else if (name === "Manifold Air Pressure")
            headerArray = ["Line", "Interval", "MAP"];
        else if (name === "Intake Air Temperature")
            headerArray = ["Line", "Interval", "IAT"];
        else if (name === "Injector Pulse Width")
            headerArray = ["Line", "Interval", "InjectorPW"];
        else if (name === "Track Map")
            headerArray = ["Scatter", "Longitude", "Latitude"];
        else if (name === "Speed")
            headerArray = ["Line", "Interval", "Speed"];
        else
            headerArray = headerArray.concat([name]);

        dataArrays.push(headerArray[0]);

        for(let i = 1; i < this.dataCSV.length; i++) {
            for (let j = 1; j < headerArray.length; j++) {
                if(this.dataCSV[i].label === headerArray[j]) {
                    dataArrays.push(this.dataCSV[i])
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

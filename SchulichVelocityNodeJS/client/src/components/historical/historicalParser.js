import React, { Component } from 'react';

export default class HistoricalParser extends Component {
    constructor(props) {
        super(props);

        this.datasets = [{
            label: "",
            data: []
        }]
    }

    parseData = (historicalData) => {
        const result = historicalData[0];
        for (const label in result) {
            var temp = { label: label, data: [] };
            this.datasets.push(temp);
        }

        for (const result in historicalData) {
            if (!historicalData.hasOwnProperty(result)) continue;
            var dataset = historicalData[result];
            for (const datum in dataset) {
                if (!dataset.hasOwnProperty(datum)) continue;
                var index = this.datasets.findIndex(obj =>
                    obj.label === datum
                );
                this.datasets[index].data.push(dataset[datum]);
            }
        }
    };


    // this function is outdated, when we're going to use historicalParser, copy function from parseCSV
    getData(name) {
        let headerArray = [];
        let dataArrays = [];

        if      (name === "Suspension")
            headerArray = [1, "Line", "Interval", "RearRight", "RearLeft", "FrontLeft", "FrontRight"];
        else if (name === "Accel vs Time")
            headerArray = ["Line", "Interval", "AccelX", "AccelY", "AccelZ"];
        else if (name === "Accel Map")
            headerArray = ["Scatter", "Interval", "AccelX", "AccelY"];
        // else if (name === "RPM")
        //     headerArray = ["Line", "Interval", "RPM", "Speed"];
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
            headerArray = ["Scatter", "Interval", "Longitude", "Latitude"];
        else if (name === "Speed")
            headerArray = ["Line", "Interval", "Speed"];
        else if (name === "Throttle Position")
            headerArray = ["Line", "Interval", "TPS"];
        else if (name === "Distance")
            headerArray = ["Line", "Interval", "Distance"];
        else if (name === "Intake Air Pressure")
            headerArray = ["Line", "Interval", "IAT"];
        else if (name === "Air To Fuel")
            headerArray = ["Line", "Interval", "AFR"];
        else if (name === "Axes") {
            headerArray = ["Line", "Interval", "Yaw", "Pitch", "Roll"]
        }
        else
            headerArray = ["Line", "Interval", name];

        dataArrays.push(headerArray[0]);

        for(let i = 1; i < this.dataCSV.length; i++) {
            for (let j = 1; j < headerArray.length; j++) {
                if(this.dataCSV[i].label === headerArray[j]) {
                    dataArrays.push(this.dataCSV[i])
                }
            }
        }
        return dataArrays;
    }


    render() {
        return (<div></div>);
    }
}

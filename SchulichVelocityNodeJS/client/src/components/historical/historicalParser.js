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
        let headerArray = ["Interval"];
        let dataArrays = [[]];

        if (name === "Suspension")
            headerArray = headerArray.concat(["Line", "RearRight", "RearLeft", "FrontLeft", "FrontRight"]);
        else if (name === "Acceleration v Time")
            headerArray = headerArray.concat(["Line", "AccelX", "AccelY", "AccelZ"]);
        else if (name === "Acceleration Scatter")
            headerArray = headerArray.concat(["Scatter", "AccelX", "AccelY", "AccelZ"]);
        else if (name === "Engine Temperature")
            headerArray = headerArray.concat(["Line", "EngineTemp"]);
        else if (name === "Oil Temperature")
            headerArray = headerArray.concat(["Line", "OilTemp"]);
        else if (name === "Oil Pressure")
            headerArray = headerArray.concat(["Line", "OilPressure"]);
        else if (name === "Barometer")
            headerArray = headerArray.concat(["Line", "Baro"]);
        else if (name === "Fuel Temperature")
            headerArray = headerArray.concat(["Line", "FuelTemp"]);
        else if (name === "Manifold Air Pressure")
            headerArray = headerArray.concat(["Line", "MAP"]);
        else if (name === "Intake Air Temperature")
            headerArray = headerArray.concat(["Line", "IAT"]);
        else if (name === "Injector Pulse Width")
            headerArray = headerArray.concat(["Line", "InjectorPW"]);
        else if (name === "Track Map")
            headerArray = headerArray.concat(["Scatter", "Longitude", "Latitude"]);
        else
            headerArray = headerArray.concat([name]);

        for(let i = 0; i < this.dataCSV.length; i++)
            for(let j = 1; j < headerArray.length; j++)
                if(headerArray[i] === this.dataCSV.label) {
                    dataArrays.push(this.dataCSV.data)
                }

        return dataArrays;
    }


    render() {
        return (<div></div>);
    }
}

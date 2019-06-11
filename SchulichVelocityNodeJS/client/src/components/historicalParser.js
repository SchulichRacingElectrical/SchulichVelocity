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
    }

    getData(name) {
        let headerArray = [];
        let dataArrays = [];
        dataArrays.push(this.datasets[1]);

        if (name === "Suspension") 
            headerArray = ["rearright", "rearleft", "frontleft", "frontright"];
        else if (name === "Acceleration")
            headerArray = ["accelx", "accely", "accelz"];
        else if (name === "Engine Temperature")
            headerArray = ["enginetemp"];
        else if (name === "Oil Temperature")
            headerArray = ["oiltemp"];
        else if (name === "Oil Pressure")
            headerArray = ["oilpressure"];
        else if (name === "Barometer")
            headerArray = ["baro"];
        else if (name === "Fuel Temperature")
            headerArray = ["fueltemp"];
        else if (name === "Manifold Air Pressure")
            headerArray = ["map"];
        else if (name === "Intake Air Temperature")
            headerArray = ["iat"];
        else if (name === "Injector Pulse Width")
            headerArray = ["injectorpw"];
        else
            headerArray = [name];

        for (let i = 0; i < this.datasets.length; i++) 
            for (let j = 0; j < headerArray.length; j++) 
                if (headerArray[j].toLowerCase() === this.datasets[i].label) 
                    dataArrays.push(this.datasets[i]);
        return dataArrays;
    }

    render() {
        return (<div></div>);
    }
}
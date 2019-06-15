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

    getData(name) {
        let headerArray = [];
        let dataArrays = [[]];

        if (name === "Suspension") 
            headerArray = ["line", "interval", "rearright", "rearleft", "frontleft", "frontright"];
        else if (name === "Accel Map")
            headerArray = ["line", "interval", "accelx", "accely", "accelz"];
        else if (name === "Accel vs Time")
            headerArray = ["scatter", "interval", "accelx", "accely"];
        else if (name === "RPM")
            headerArray = ["line", "interval", "rpm"];
        else if (name === "Engine Temperature")
            headerArray = ["line", "interval", "enginetemp"];
        else if (name === "Oil Temperature")
            headerArray = ["line", "interval", "oiltemp"];
        else if (name === "Oil Pressure")
            headerArray = ["line", "interval", "oilpressure"];
        else if (name === "Barometer")
            headerArray = ["line", "interval", "baro"];
        else if (name === "Fuel Temperature")
            headerArray = ["line", "interval", "fueltemp"];
        else if (name === "Manifold Air Pressure")
            headerArray = ["line", "interval", "map"];
        else if (name === "Intake Air Temperature")
            headerArray = ["line", "interval", "iat"];
        else if (name === "Injector Pulse Width")
            headerArray = ["line", "interval", "injectorpw"];
        else if(name === "Track Map")
            headerArray = ["scatter", "interval", "longitude", "latitude"];
        else if(name === "Speed")
            headerArray = ["line", "interval", "speed"];
        else if(name === "Throttle Position")
            headerArray = ["line", "interval", "TPS"];
        else if(name === "Distance")
            headerArray = ["line", "interval", "distance"];
        else if (name === "Air To Fuel")
            headerArray = ["line", "interval", "afr"];
        else if(name === "Axles")
            headerArray = ["line", "interval", "yaw", "pitch", "roll"]
        else
            headerArray = ["line", "interval", name];

        for(let i = 0; i < headerArray.length; i++){
            dataArrays.push([]);
            dataArrays[i].push(headerArray[i]);
            for(let j = 1; j < this.datasets.length; j++){
                for(let k = 1; k < headerArray.length; k++){
                    if(this.datasets[j].label === headerArray[k]){
                        dataArrays[i].push(this.datasets[j]);
                    }
                }
            }
        }
        dataArrays.pop();
        return dataArrays;
    }

    render() {
        return (<div></div>);
    }
}
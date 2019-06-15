import React, { Component } from 'react';
import { Line, Scatter } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';

const allLabels = ["RPM", "EngineTemp", "OilTemp", "OilPressure", "AFR",
    "Battery", "IAT", "MAP", "TPS", "AccelX", "AccelY",
    "AccelZ", "Speed", "Roll", "Pitch", "Yaw", "Longitude",
    "Latitude", "FrontRight", "FrontLeft", "RearRight",
    "RearLeft", "Utc", "InjectorPW", "Baro", "FuelTemp", "Distance"]

export default class StreamGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            graphType: "line",
            labels: [],
            datasets: [{
                label: "",
                data: []
            }],
            lineData: {}
        };
        this.options = {
            layout: {
                padding: {
                    left: 80,
                    right: 30,
                    top: 0,
                    bottom: 0
                }
            },
            animation: {
                duration: 0
            },
            title: {
                display: true,
                fontSize: 30,
                text: ''
            },
            responsive: true,
            scales: {
                xAxes: [{
                    realtime: {
                        onRefresh: function (chart) { },
                    }
                }]
            }
        }
        this.initData();
    }

    initData() {
        for (let i = 0; i < allLabels.length; i++) {
            this.state.datasets.push({
                label: allLabels[i],
                data: [],
                borderColor: 'rgb(255, 0, 0)',
                pointRadius: 1,
                backgroundColor: 'rgba(0,0,0,0.0)',
                lineTension: 0,
            });
        }
    }

    pushData(data) {
        let colorArray = ['rgb(255, 0, 0)', 'rgb(0, 255, 0)', 'rgb(0, 0, 255)',
                          'rgb(255, 255, 0)', 'rgb(0, 255, 255)', 'rgb(255, 0, 255)'];
        this.state.labels.push(data["Utc"]); //Update time
        if (this.state.labels.length > 100)
            this.state.labels.slice(0, 1);
        for (var key in data) {
            if (key !== "Utc") {
                let i = this.state.datasets.findIndex(x => x.label === key);
                this.state.datasets[i].data.push(data[key]);
                if (this.state.datasets[i] > 100)
                    this.state.datasets[i].splice(0, 1);
            }
        }

        let name = this.options.title.text;
        let headerArray = [];
        this.state.graphType = "line";
        if (name === "Suspension")
            headerArray = ["Utc", "RearRight", "RearLeft", "FrontLeft", "FrontRight"];
        else if (name === "Accel Map")
            headerArray = ["Utc", "AccelX", "AccelY", "AccelZ"];
        else if (name === "Accel vs Time") {
            headerArray = ["scatter", "Utc", "AccelX", "AccelY"];
            this.state.graphType = "scatter";
        }
        else if (name === "RPM")
            headerArray = ["Utc", "RPM"];
        else if (name === "Engine Temperature")
            headerArray = ["Utc", "EngineTemp"];
        else if (name === "Oil Temperature")
            headerArray = ["Utc", "OilTemp"];
        else if (name === "Oil Pressure")
            headerArray = ["Utc", "OilPressure"];
        else if (name === "Barometer")
            headerArray = ["Utc", "Baro"];
        else if (name === "Fuel Temperature")
            headerArray = ["Utc", "FuelTemp"];
        else if (name === "Manifold Air Pressure")
            headerArray = ["Utc", "MAP"];
        else if (name === "Intake Air Temperature")
            headerArray = ["Utc", "IAT"];
        else if (name === "Injector Pulse Width")
            headerArray = ["Utc", "InjectorPW"];
        else if (name === "Track Map") {
            headerArray = ["scatter", "Utc", "Longitude", "Latitude"];
            this.state.graphType = "scatter";
        }
        else if (name === "Speed")
            headerArray = ["Utc", "Speed"];
        else if (name === "Throttle Position")
            headerArray = ["Utc", "TPS"];
        else if (name === "Distance")
            headerArray = ["Utc", "Distance"];
        else if (name === "Air To Fuel")
            headerArray = ["Utc", "AFR"];
        else if (name === "Axles")
            headerArray = ["Utc", "Yaw", "Pitch", "Roll"]
        else
            headerArray = ["Utc", name];
        
        let dataArrays = {};
        for (let i = 0; i < headerArray.length; i++) {
            //dataArrays.push([]);
            let temp = headerArray[i];
            for (let j = 1; j < this.state.datasets.length; j++) {
                for (let k = 1; k < headerArray.length; k++) {
                    if (this.state.datasets[j].label === headerArray[k]) {
                        dataArrays.push({
                            data: this.state.datasets[j].data,
                            label: temp,
                            borderColor: colorArray[i - 2],
                            pointRadius: 0.5,
                            borderWidth: 2,
                            showLine: true,
                            backgroundColor: 'rgba(0,0,0,0.0)',
                            lineTension: 0
                        });
                    }
                }
            }
        }
        //dataArrays.pop();
        this.lineData = dataArrays;
    }

    setTitle = (selected) => {
        if (selected !== null && selected !== "Select Data")
            this.options.title.text = selected;
        this.setState({ state: this.state });
    }

    render() {
        if (this.state.graphType === "line") {
            return (
                <div>
                    <Line data={this.state} options={this.options} />
                </div>
            );
        }
        else {
            return (
                <div>
                    <Scatter data={this.state} options={this.options} />
                </div>
            );
        }
    }
}
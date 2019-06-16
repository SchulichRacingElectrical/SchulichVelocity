import React, { Component } from 'react';
import { Line, Scatter } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';

const initialState = {
    currentLabel: 0,
    labels: [],
    datasets: [{
        data: []
    }]
}

export default class StreamGraph extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.headerArray = [];
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
        };
        this.ready = false;
    }

    pushData(data) {
        if (this.ready) { //semaphore
            this.state.labels.push(data["Interval"]); //Update time
            this.setState({ currentLabel: this.state.currentLabel + 1 });
            if (this.state.labels.length > 100)
                this.state.labels.shift();
            this.setState(this.state);
            
            var inserted = false;

            for (var key in this.headerArray) {
                for (var temp in data) {
                    if (this.headerArray[key] === temp && temp !== "" && temp !== "Interval") {
                        let i = this.state.datasets.findIndex(x => x.label === this.headerArray[key]);
                        this.state.datasets[i].data.push(data[temp]);
                        inserted = true;
                    }
                }
                if(!inserted) //Needed for gaps between values due to Hz of signals coming in.
                    this.state.datasets[key].push(null); //MIGHT BE WRONG -TEST
            }
            this.forceUpdate();
        }
    }

    setTitle = (name) => {
        this.ready = false; //acts as a semaphore

        if (name !== null && name !== "Select Data") {
            this.options.title.text = name;
            this.graphType = "line";
            var headerArray = [];
            if (name === "Suspension") //CLEAN THIS
                headerArray = ["Interval", "RearRight", "RearLeft", "FrontLeft", "FrontRight"];
            else if (name === "Accel Map")
                headerArray = ["Interval", "AccelX", "AccelY", "AccelZ"];
            else if (name === "Accel vs Time") {
                headerArray = ["Interval", "AccelX", "AccelY"];
                this.graphType = "scatter";
            }
            else if (name === "RPM")
                headerArray = ["Interval", "RPM"];
            else if (name === "Engine Temperature")
                headerArray = ["Interval", "EngineTemp"];
            else if (name === "Oil Temperature")
                headerArray = ["Interval", "OilTemp"];
            else if (name === "Oil Pressure")
                headerArray = ["Interval", "OilPressure"];
            else if (name === "Barometer")
            headerArray = ["Interval", "Baro"];
            else if (name === "Fuel Temperature")
                headerArray = ["Interval", "FuelTemp"];
            else if (name === "Manifold Air Pressure")
                headerArray = ["Interval", "MAP"];
            else if (name === "Intake Air Temperature")
                headerArray = ["Interval", "IAT"];
            else if (name === "Injector Pulse Width")
                headerArray = ["Interval", "InjectorPW"];
            else if (name === "Track Map") {
                headerArray = ["Interval", "Longitude", "Latitude"];
                this.graphType = "scatter";
            }
            else if (name === "Speed")
                headerArray = ["Interval", "Speed"];
            else if (name === "Throttle Position")
                headerArray = ["Interval", "TPS"];
            else if (name === "Distance")
                headerArray = ["Interval", "Distance"];
            else if (name === "Air To Fuel")
                headerArray = ["Interval", "AFR"];
            else if (name === "Axles")
                headerArray = ["Interval", "Yaw", "Pitch", "Roll"]

            this.setState(initialState);
            this.state.datasets.splice(0, this.state.datasets.length);
            this.state.labels.splice(0, this.state.labels.length);

            for (var key in headerArray) {
                if(headerArray[key] === "Interval") continue;
                this.state.datasets.push({
                    label: headerArray[key],
                    data: [],
                    borderColor: 'rgb(255, 0, 0)',
                    pointRadius: 1,
                    backgroundColor: 'rgba(0,0,0,0.0)',
                    lineTension: 0,
                })
            }
            this.headerArray.splice(0, headerArray.length);
            this.headerArray = headerArray;
        }
        this.ready = true;//acts as a semaphore
    }

    render() {
        if (this.graphType === "line") {
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
import React, { Component } from 'react';
import { CSVReader } from 'react-papaparse';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';

export default class ParseCSV extends Component {
    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
        this.chartElement = React.createRef();
        this.state = {
            labels: [],
            title: [],
            datasets: [{
                data: [],
                borderColor: 'rgb(255, 0, 0)',
                backgroundColor: 'rgba(0,0,0,0.0)',
                lineTension: 0,
            }]
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
            }
        }
    }

    handleReadCSV = (data) => {
        for(let i = 0; i < data.data.length; i++) {
            this.chartData.labels[i] = data.data[i].Interval; //Interval = time header
            //this.chartData.datasets[0].data[i] = parseInt(data.data[i].Speed, 10);
        }
        let uneString = Object.keys(data.data[0]);
        for (let i = 1; i < Object.keys(data.data[0]).length; i++) {
            this.chartData.datasets.push({
                data: [],
                borderColor: 'rgb(255, 0, 0)',
                backgroundColor: 'rgba(0,0,0,0.0)',
                lineTension: 0,
                hidden: true,
                label: uneString[i],
            });
            for(let j = 0; j < data.data.length; j++) {
                this.chartData.datasets[i].data.push(parseFloat(data.data[j][uneString[i]] , 10));
            }
        }
        this.forceUpdate();
    };

    handleOnError = (err, file, inputElem, reason) => {
        console.log(err);
    };

    handleImportOffer = () => {
        this.fileInput.current.click();
        this.setState({state: this.state});
    };

    setTitle = (selected) => {
        if(selected !== null && selected !== "Select Data")
            this.options.title.text = selected;
        this.setState({state: this.state})
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
                <button onClick={this.handleImportOffer}>Import</button>
                <Line data={this.state} options={this.options}/>
            </div>
        );
    }
}
import React, { Component } from 'react';
import { Scatter } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';

export default class HistoricalLineGraph extends Component {
    constructor(props){
        super(props);
        this.state = {
            label: '',
            data: [{
                // x: 0
                // y: 0
            }]
        };
        this.options = {
            layout: {
                padding: {
                    left: 80,
                    right: 20,
                    top: 0,
                    bottom: 0
                }

            },
            elements: {
                line: {
                    tension: 0
                }
            },
            tooltips: {
                enabled: false
            },
            animation: {
                duration: 0
            },
            hover : {
                animationDuration: 0
            },
            title: {
                display: true,
                fontSize: 30,
                text: ''
            }
        };
    }

    setTitle = (selected) => {
        if(selected !== null && selected !== "Select Data")
            this.options.title.text = selected;
        this.setState({state: this.state})
    };

    setData = (data) => {
        let colorArray = ['rgb(255, 0, 0)', 'rgb(0, 255, 0)', 'rgb(0, 0, 255)',
            'rgb(255, 255, 0)', 'rgb(0, 255, 255)', 'rgb(255, 0, 255)'];
        //Clear previous data
        this.state.data = [{}];
        //Push in new data

        console.log(data.length);

        for(let i = 1; i < data.length; i++) {
            this.state.data.push({
                x: data[i].data[i],
                y: data[i].label[i],
            })
        }
        this.setState({state: this.state});
    };

    resize(smaller) {
        if(smaller === true)
            this.options.layout.padding = 240;
        else
            this.options.layout.padding = 80;
    }

    render() {
        return (
            <div>
                <Scatter data={this.state} options={this.options}/>
            </div>
        )
    }
}

import React, { Component } from 'react';

export default class DataCSV extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dataName:'',
            datasets: [{
                data : []
            }]
        }
    }
}
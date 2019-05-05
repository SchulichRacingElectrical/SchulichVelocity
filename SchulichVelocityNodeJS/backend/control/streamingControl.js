'use strict';
const {Control} = require('./control');
const {StreamingModel} = require('../model/streamingModel');

class StreamingControl extends Control{
    constructor(model) {
        super();
    }

    fetchData(request) {

    }
}

module.exports = StreamingControl;
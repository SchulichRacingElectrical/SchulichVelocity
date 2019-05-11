'use strict';
const {Control} = require('./control');

class StreamingControl extends Control{
    constructor(model) {
        super(model);
    }

    fetchData(request) {

    }
}

module.exports = StreamingControl;
'use strict';
const Control = require('./control');

class StreamingControl extends Control{
    constructor(model, router) {
        super(model, router);
    }

    fetchData(request) {
        
    }
}

module.exports = StreamingControl;
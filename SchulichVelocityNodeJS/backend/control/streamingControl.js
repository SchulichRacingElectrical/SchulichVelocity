'use strict';
const Control = require('./control');

class StreamingControl extends Control{
    constructor(model) {
        super(model);
    }

    start() {
        this.model.start();
    }

    fetchData() {
        this.model.getData();
    }
}

module.exports = StreamingControl;
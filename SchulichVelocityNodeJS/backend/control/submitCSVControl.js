'use strict';
const Control = require('./control');
const {submitCSVModel} = require('../model/submitCSVModel');

class SubmitCSVControl extends Control{
    constructor(model, router) {
        super(model, router);
    }

    parseCSV(csv) {

    }

    insertToDB() {

    }
}

module.exports =  SubmitCSVControl;
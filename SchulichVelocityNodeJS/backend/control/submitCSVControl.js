'use strict';
const Control = require('./control');
const {submitCSVModel} = require('../model/submitCSVModel');

class SubmitCSVControl extends Control{
    constructor(model) {
        super(model);
    }

    insertToDB(dataCSV) {
        this.model.insertData(dataCSV)
    }
}

module.exports =  SubmitCSVControl;
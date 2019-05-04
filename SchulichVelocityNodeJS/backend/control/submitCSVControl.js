const {Control} = require('./control');
const {submitCSVModel} = require('../model/submitCSVModel');


class SubmitCSVControl extends Control{
    constructor(model) {
        super();
        this.model = model;
    }

    parseCSV(csv) {

    }

    insertToDB() {

    }
}

module.exports =  SubmitCSVControl;
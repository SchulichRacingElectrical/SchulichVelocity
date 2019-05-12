'use strict';
const Control = require('./control');

class HistoricalControl extends Control{
    constructor(model, app) {
        super(model, app);
        this.data;
    }

    async getDataFromModel(req) {
        return await this.model.fetchData(req);
    }

    async getData() {
        return await this.data;
    }
}

module.exports = HistoricalControl;
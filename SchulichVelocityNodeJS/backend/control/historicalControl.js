const {Control} = require('./control');

class HistoricalControl extends Control{
    constructor(model) {
        super();
        this.model = model;
    }

    fetchData(request) {
        
    }
}

module.exports = HistoricalControl;
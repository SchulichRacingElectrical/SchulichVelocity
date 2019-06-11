'use strict';
const Model = require('./model');

class HistoricalModel extends Model{
    constructor(DB) {
        super(DB);
    }

    async fetchData(tableName) {
        let table = await this.DB.query(`SELECT * FROM ${tableName}`)
            .catch(error => console.error('Something went wrong!', error.stack));
        return table;
    }
}

module.exports = HistoricalModel;
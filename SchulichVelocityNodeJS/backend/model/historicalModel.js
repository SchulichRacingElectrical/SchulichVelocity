'use strict';
const Model = require('./model');

class HistoricalModel extends Model {
    constructor(DB) {
        super(DB);
    }

    async fetchTableNames() {
        //Get the table names for the data selector on the react side
    }

    async fetchData(tableName) { //Fix to fetch data column by column and place into object array
        let table = await this.DB.query(`SELECT * FROM ${tableName}`)
            .catch(error => console.error('Something went wrong!', error.stack));
        return await this.processData(table.rows);
    }

    processData(data) { //Transpose matrix received from DB FOR NOW
        var processedData = [{
            label: "",
            data: []
        }];

        const result = data[0];
        for (const label in result) {
            var temp = { label: label, data: [] };
            processedData.push(temp);
        }

        for (const result in data) {
            if (!data.hasOwnProperty(result)) continue;
            var dataset = data[result];
            for (const datum in dataset) {
                if (!dataset.hasOwnProperty(datum)) continue;
                var index = processedData.findIndex(obj =>
                    obj.label === datum
                );
                processedData[index].data.push(dataset[datum]);
            }
        }
        return processedData;
    }
}

module.exports = HistoricalModel;
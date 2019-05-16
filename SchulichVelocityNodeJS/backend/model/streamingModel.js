'use strict';
const Model = require('./model');

class StreamingModel extends Model{
    constructor(DB) {
        super(DB);
        this.redis = require('redis');
        this.client;
    }

    start() { 
        this.client = this.redis.createClient(); 
        this.client.on('error', function(err) {
            "Could not connect to streaming server."
        });
    }

    fetchData() {
        //fetch the data, parse out as needed
        //store data to the DB
        //return the data to the controller
    }

    saveData() {
        //store each piece of data from the transmission in new table.
    }
}

module.exports = StreamingModel;
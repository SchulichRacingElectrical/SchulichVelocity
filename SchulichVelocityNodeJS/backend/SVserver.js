'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool, Client } = require('pg');
const HistoricalControl = require('./control/historicalControl');
const StreamingControl = require('./control/streamingControl');
const SubmitCSVControl = require('./control/submitCSVControl');
const HistoricalModel = require('./model/historicalModel');
const StreamingModel = require('./model/streamingModel');
const SubmitCSVModel = require('./model/submitCSVModel');
const PORT = 5000;
const app = express();

import {PubsubManager} from 'redis-messaging-manager';

let messenger = new PubsubManager({
   host: 'localhost'
});

console.log('consuming messages..!');
messenger.consume('streaming')
    .subscribe(msg => {
        console.log('Got message- ', msg);
    });

class Server {
    constructor(app) {
        this.app = app;
        this.router = express.Router();
        this.controller;
        this.pool = new Pool({
            port: 5432,
            password: 'greentomato',
            database: 'postgres',
            host: '3.19.41.249',
            user: 'postgres',
        });
    }

    start() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cors());
        this.app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
        this.run();
    }

    async run() {
        this.app.post("/api/request", (req, res) => {
            if (req.body.post === "historical") {
                var historicalModel = new HistoricalModel(this.pool);
                this.controller = new HistoricalControl(historicalModel, this.app);
            }
            else if (req.body.post === "streaming") {
                var streamingModel = new StreamingModel(this.pool);
                this.controller = new StreamingControl(streamingModel, this.app);
            }
            else if (req.body.post === "submitCSV") {
                var submitCSVModel = new SubmitCSVModel(this.pool);
                this.controller = new SubmitCSVControl(submitCSVModel, this.app);
            }
            res.send();
        });

        this.app.post('/api/getHistoricalData', async (req, res) => {
            var data = await this.controller.getDataFromModel(req.body.post);
            var json = JSON.stringify({
                data: data.rows
            })
            res.end(json);
        });

        this.app.post('/api/getStreamingData', async (req, res) => {
            var redis = require('redis');
            var subscriber = redis.createClient();

            subscriber.on("streaming", function (channel, message) {
                console.log(message);
            });
        });

        this.app.post('/api/submitCSV', async (req, res) => {
            //Use CSV controller to call CSV Model which will parse out the csv to properly insert into a table
        });
    }
}

var server = new Server(app);
server.start();

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

class Server {
    constructor(app) {
        this.app = app;
        this.router = express.Router();
        this.controller;
        this.data = {};
        this.redis = require('redis');
        this.subscriber = this.redis.createClient();
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
            });
            return res.send(json);
        });

        this.app.post('/api/getStreamingData', async (req, res) => {
             var json = JSON.stringify({
                 data: data
            });
            return res.send(json);
        });

        this.app.post('/api/submitCSV', async (req, res) => {
            //Use CSV controller to call CSV Model which will parse out the csv to properly insert into a table
        });
        this.subscriber.subscribe("streaming");
         this.subscriber.on("message", function (channel, message) {
             this.data = JSON.parse(message);
         });
    }
}

var server = new Server(app);
server.start();

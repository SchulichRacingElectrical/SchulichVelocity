'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {Pool, Client} = require('pg');
const HistoricalControl = require('./control/historicalControl');
const StreamingControl = require('./control/streamingControl');
const SubmitCSVControl = require('./control/submitCSVControl');
const HistoricalModel = require('./model/historicalModel');
const StreamingModel = require('./model/streamingModel');
const SubmitCSVModel = require('./model/submitCSVModel');
const app = express();
const PORT = 5000;

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
        this.streamingControl = new StreamingControl(new StreamingModel(this.pool), this.app);
    }

    start() {
        this.app.use(bodyParser.json({limit: '50mb', extended: true}));
        this.app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
        this.app.use(cors());
        this.app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
        this.streamingControl.start();
        this.run();
    }

    async run() {
        this.app.post("/api/request", (req, res) => {
            if(req.body.post === "historical")
                this.controller = new HistoricalControl(new HistoricalModel(this.pool), this.app);
            else if(req.body.post === "submitCSV")
                this.controller = new SubmitCSVControl(new SubmitCSVModel(this.pool), this.app);
            res.send();
        });

        this.app.post('/api/getHistoricalData', async(req, res) => {
            var historicalData = await this.controller.getDataFromModel(req.body.post);
            var json = JSON.stringify({
                data: historicalData
            });
            res.end(json);
        });

        this.app.post('/api/getStreamingData', async(req, res) => {
            var streamingData = await this.streamingControl.fetchData();
            var json = JSON.stringify({
                data: streamingData
            });
            res.end(json);
        });

        this.app.post('/api/saveCSV', async(req, res) => {
            this.controller.insertToDB(req.body.post);
            res.send();
        });
    }
}

var server = new Server(app);
server.start();

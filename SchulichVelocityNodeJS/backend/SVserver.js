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
const PORT = 5000;
const app = express();

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
            if(req.body.post === "historical"){
                console.log('here')
                var historicalModel = new HistoricalModel(this.pool);
                this.controller = new HistoricalControl(historicalModel, this.router);
                this.controller.getDataFromModel('test.endurance');
            }
            else if(req.body.post === "streaming"){
                var streamingModel = new StreamingModel(this.pool);
                this.controller = new StreamingControl(streamingModel, this.app);
                this.controller.start();
            }
            else if(req.body.post === "submitCSV"){
                var submitCSVModel = new SubmitCSVModel(this.pool);
                this.controller = new SubmitCSVControl(submitCSVModel, this.app);
                this.controller.start();
            }
            res.send('Well done');
            console.log(req.body.post);
        });

        this.app.get('/api/getHistoricalData', async(req, res) => {
            res.send(this.controller.getDataFromModel('test.endurance').json());
            console.log(this.controller.getDataFromModel('test.endurance'));
            res.send(this.controller.data);
        });
    }
}

var server = new Server(app);
server.start();


// app.post('/submitCSV', (req, res) => {
//     console.log('here');
//     //res is the file
// });

//const csvControl = require('./control/submitCSVControl');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {Pool} = require('pg');
const PORT = 3001;

class Server {
    constructor() {
        this.app = express();
        this.pool = new Pool({
            port: 5432,
            password: 'greentomato',
            database: 'postgres',
            host: '3.19.41.249',
            user: 'postgres',
        });
        this.shutdown = false;
    }

    run() {
        //app.get('/api/get', (req, res) => {
        const tableName = 'test.endurance';
        this.pool.connect((err, client, done) => {
            if (err) {
                return console.log(err);
            } else {
                this.pool.query(`SELECT * FROM ${tableName}`, (err, table) => {
                    done();
                    if (err) {
                        return console.log('Something went wrong: ' + err);
                    }
                    console.log("fetched!");
                    //console.log(table);
                    //res.send(table);
                })
            }
        })
        //})
    }

    shutdown() {

    }

    start() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cors());
        this.run();
    }
}

var server = new Server();
server.start();
server.app.listen(PORT, () => console.log(`Listening on port ${PORT}`));






// app.post('/submitCSV', (req, res) => {
//     console.log('here');
//     //res is the file
// });





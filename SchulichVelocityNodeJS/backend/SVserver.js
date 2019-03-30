const csvControl = require('./control/csvControl');
const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors')
// const {Pool} = require('pg')
const PORT = 3001;

// const pool = new Pool({
//     port : 5432,
//     password: 'schulichracing',
//     database: 'SRtesting',
//     host: 'localhost',
//     user: 'postgres',
//     max: 2
// })


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
// app.use(cors())

// app.get('/api/get', (req, res) => {
//     const tableName = 'people'
//     pool.connect((err, client, done) => {
//         if(err) {
//             return console.log(err)
//         } else {
//             pool.query(`SELECT * FROM ${tableName}`, (err, table) => {     //This is where you put the sql
//                 done()
//                 if (err) {
//                     return console.log('Something went wrong: '+ err);
//                 }
//                 console.log("fetched!")
//                 res.send(table)
//              })
//         }
//     })
// })

app.post('/submitCSV', (req, res) => {
    console.log('here');
    //res is the file
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

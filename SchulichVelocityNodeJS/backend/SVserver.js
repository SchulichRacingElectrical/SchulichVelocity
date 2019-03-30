const csvControl = require('./control/csvControl');
const express = require('express');
const bodyParser = require('body-parser');
//const cors = require('cors')
const {Pool} = require('pg')
const PORT = 3001;

const pool = new Pool({
    port : 5432,
    password: 'schulichracing',
    database: 'SRtesting',
    host: 'localhost',
    user: 'postgres',
    max: 2
})


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
//app.use(cors())

app.get('/api/get', (req, res) => {
    const tableName = '"Endurance-Luke-June23-2018"'
    pool.connect((err, client, done) => {
        if(err) {
            return console.log(err)
        } else {
            pool.query(`SELECT "Interval", "RPM" FROM ${tableName}`, (err, table) => {     //This is where you put the sql
                done()
                if (err) {
                    return console.log('Something went wrong: '+ err);
                }
                console.log("fetched!")
                res.send(new Session(table.rows))
             })
        }
    })
})

app.post('/submitCSV', (req, res) => {
    console.log(req)
//    const tableName = "people"                 //change this to change the name of the table
//     const csv = "'../testing.csv'"                 //the csv file
//     const columns = "(will, very, gay)"
// //    const sqlCreateStatement = `CREATE TABLE ${tableName} ( ${columns})`
//     const sqlImportStatement = `COPY ${tableName} FROM ${csv} DELIMITER ','`
//     pool.connect((err, client, done) => {
//         if(err) {
//             return console.log(err)
//         } else {
//             pool.query(sqlImportStatement, (err) => {    
//                 done()
//                 if (err) {
//                     return console.log('Something went wrong: '+ err);
//                 }
//                 console.log("imported!")
//              })
//         }
//     })
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

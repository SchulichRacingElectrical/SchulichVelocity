'use strict';
const {Model} = require('./model');

class SubmitCSVModel extends Model {
    constructor(DB) {
        super(DB);
    }

    insertData(data) {

    }
}

module.exports = SubmitCSVModel;

//Must insert:
//interval: numeric
//utc: [PK] numeric
//rearright: numeric
//rearleft: numeric
//frontleft: numeric
//frontright: numeric
//battery: numeric
//accelx: numeric
//accely: numeric
//accelz: numeric
//yaw: numeric
//pitch: numeric
//roll: numeric
//rpm: numeric
//tps: numeric
//injectorpw: numeric
//baro: numeric
//map: numeric
//afr: numeric
//iat: numeric
//enginetemp: numeric
//oilpressure: numeric
//oiltemp: numeric
//fueltemp: numeric
//latitude: numeric
//longitude: numeric
//speed: numeric
//distance: numeric
//altitude: numeric
//gpsstats: numeric
//gpsqual: numeric
//gpsdop: numeric
//lapcount: numeric
//laptime: numeric
//sector: numeric
//sectortime: numeric
//predtime: numeric
//currentlap: [PK] text
import React, { Component } from 'react';
import Badge from 'react-bootstrap/Badge';

const style = {
    position: "absolute",
    marginLeft: "13%"
}
const normalVariant = "primary";
const dangerVariant = "danger";
const goodVariant = "success";

export default class StreamingDash extends Component {
    constructor(props) {
        super(props);
        this.rpm = 0;
        this.engineTemp = 0;
        this.oilTemp = 0;
        this.oilPres = 0;
        this.afr = 0;
        this.iat = 0;
        this.map = 0;
        this.tps = 0;
        this.accelX = 0;
        this.accelY = 0;
        this.accelZ = 0;
        this.speed = 0;
        this.roll = 0;
        this.pitch = 0;
        this.yaw = 0;
        this.battery = 0;
        this.pdmTemp = 0;
        this.pdmVoltage = 0;
        this.longitude = 0;
        this.latitude = 0;
    }

    insertData(data) {
        //Insert all the new incoming data
        for (var key in data) {
            if (key == "RPM"){
                this.rpm = data[key]
            } else if (key == "CoolantTemp"){
                this.oilTemp = data[key]
            }else if (key == "OilPressure"){
                this.oilPres = data[key]
            }else if (key == "AFR"){
                this.afr = data[key]
            }else if (key == "IAT"){
                this.iat = data[key]
            }else if (key == "MAP"){
                this.map = data[key]
            }else if (key == "TPS"){
                this.tps = data[key]
            }else if (key == "AccelX"){
                this.accelX = data[key]
            }else if (key == "AccelY"){
                this.accelY = data[key]
            }else if (key == "AccelZ"){
                this.accelZ = data[key]
            }else if (key == "Speed"){
                this.speed = data[key]
            }else if (key == "Roll"){
                this.roll = data[key]
            }else if (key == "Pitch"){
                this.pitch = data[key]
            }else if (key == "Yaw"){
                this.yaw = data[key]
            }else if (key == "PDMVoltage"){
                this.pdmVoltage = data[key]
            }else if (key == "PDMTemp"){
                this.pdmTemp = data[key]
            }else if (key == "Longitude"){
                this.longitude = data[key]
            }else if (key == "Latitude"){
                this.latitude = data[key]
            }
        }
    }

    checkXAccel() {
        if(this.accelX > 1)
            return goodVariant;
        else
            return normalVariant;
    }

    checkYAccel() {
        if(this.accelY > 1.5)
            return goodVariant;
        else    
            return normalVariant;
    }

    checkAFR() {
        if(this.afr > 15)
            return dangerVariant;
        else
            return normalVariant;
    }

    checkEngineTemp() {
        if(this.engineTemp > 110)
            return dangerVariant;
        else
            return normalVariant;
    }

    render() {
        return (
            <div style={style}>
                <p></p>
                <p><strong>Power Train</strong></p>
                <h1>
                    RPM
                    <Badge variant={normalVariant}>
                        {this.rpm}
                    </Badge>
                    &nbsp;&nbsp; Engine Temperature
                    <Badge variant={this.checkEngineTemp()}>
                        {this.engineTemp}
                    </Badge>
                </h1>
                <h3>&nbsp;</h3>
                <h1>
                    Oil Temperature
                    <Badge variant={normalVariant}>
                        {this.oilTemp}
                    </Badge>
                    &nbsp;&nbsp; Oil Pressure
                    <Badge variant={normalVariant}>
                        {this.oilPres}
                    </Badge>
                </h1>
                <h3>&nbsp;</h3>
                <h1>
                    AFR
                    <Badge variant={this.checkAFR()}>
                        {this.afr}
                    </Badge>
                    &nbsp;&nbsp; IAT
                    <Badge variant={normalVariant}>
                        {this.iat}
                    </Badge>
                    &nbsp;&nbsp; MAP
                    <Badge variant={normalVariant}>
                        {this.map}
                    </Badge>
                    &nbsp;&nbsp; TPS
                    <Badge variant={normalVariant}>
                        {this.tps}
                    </Badge>
                </h1>
                <p></p>
                <h3>&nbsp;</h3>
                <h3>&nbsp;</h3>
                <p><strong>Vehicle Dynamics</strong></p>
                <h1>
                    Accel X
                    <Badge variant={this.checkXAccel()}>
                        {this.accelX}
                    </Badge>
                    &nbsp;&nbsp; Accel Y
                    <Badge variant={this.checkYAccel()}>
                        {this.accelY}
                    </Badge>
                    &nbsp;&nbsp; Accel Z
                    <Badge variant={normalVariant}>
                        {this.accelZ}
                    </Badge>
                </h1>
                <h3>&nbsp;</h3>
                <h1>
                    Speed
                    <Badge variant={normalVariant}>
                        {this.speed}
                    </Badge>
                    &nbsp;&nbsp; Roll
                    <Badge variant={normalVariant}>
                        {this.roll}
                    </Badge>
                    &nbsp;&nbsp; Pitch
                    <Badge variant={normalVariant}>
                        {this.pitch}
                    </Badge>
                    &nbsp;&nbsp; Yaw
                    <Badge variant={normalVariant}>
                        {this.yaw}
                    </Badge>
                </h1>
                <p></p>
                <h3>&nbsp;</h3>
                <h3>&nbsp;</h3>
                <p><strong>Diagnostics</strong></p>
                <h1>
                    Battery
                    <Badge variant={normalVariant}>
                        {this.battery}
                    </Badge>
                    &nbsp;&nbsp; PDM Temperature
                    <Badge variant={normalVariant}>
                        {this.pdmTemp}
                    </Badge>
                </h1>
                <h3>&nbsp;</h3>
                <h1>
                    PDM Voltage
                    <Badge variant={normalVariant}>
                        {this.pdmVoltage}
                    </Badge>
                    &nbsp;&nbsp;Longitude
                    <Badge variant={normalVariant}>
                        {this.longitude}
                    </Badge>
                </h1>
                <h3>&nbsp;</h3>
                <h1>
                    Latitude
                    <Badge variant={normalVariant}>
                        {this.latitude}
                    </Badge>
                </h1>
            </div>
        );
    }
}
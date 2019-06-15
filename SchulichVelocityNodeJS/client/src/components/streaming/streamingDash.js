import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

const style = {
    marginLeft: "3em",
    fontSize: "30px",
}
const normalStyle = {
    background: "#00BFFF",
    textAlign: "center",
    border: "5px solid #FFF",
    color: "#FFF"
}
const dangerStyle = {
    background: "#FF0000",
    textAlign: "center",
    border: "5px solid #FFF",
    color: "#FFF"
}
const goodStyle = {
    background: "#32CD32",
    textAlign: "center",
    border: "5px solid #FFF",
    color: "#FFF"
}

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
        this.status = "Offline"
    }

    insertStatus(status){
        if (status["scriptRunning"]){
            this.status = "Running"
        }else{
            this.status = "Offline"
        }
    }
    insertData(data) {
        //Insert all the new incoming data
        for (var key in data) {
            if (key === "RPM")
                this.rpm = data[key]
            else if (key === "EngineTemp")
                this.engineTemp = data[key]
            else if (key === "OilTemp")
                this.oilTemp = data[key]
            else if (key === "OilPressure")
                this.oilPres = data[key]
            else if (key === "AFR")
                this.afr = data[key]
            else if (key === "Battery")
                this.battery = data[key]
            else if (key === "IAT")
                this.iat = data[key]
            else if (key === "MAP")
                this.map = data[key]
            else if (key === "TPS")
                this.tps = data[key]
            else if (key === "AccelX")
                this.accelX = data[key]
            else if (key === "AccelY")
                this.accelY = data[key]
            else if (key === "AccelZ")
                this.accelZ = data[key]
            else if (key === "Speed")
                this.speed = data[key]
            else if (key === "Roll")
                this.roll = data[key]
            else if (key === "Pitch")
                this.pitch = data[key]
            else if (key === "Yaw")
                this.yaw = data[key]
            else if (key === "PDMVoltage")
                this.pdmVoltage = data[key]
            else if (key === "PDMTemp")
                this.pdmTemp = data[key]
            else if (key === "Longitude")
                this.longitude = data[key]
            else if (key === "Latitude")
                this.latitude = data[key]
        }
    }

    checkXAccel() {
        if (this.accelX >= 1)
            return goodStyle;
        else
            return normalStyle;
    }

    checkYAccel() {
        if (this.accelY >= 1.5)
            return goodStyle;
        else
            return normalStyle;
    }

    checkAFR() {
        if (this.afr >= 15)
            return dangerStyle;
        else
            return normalStyle;
    }

    checkEngineTemp() {
        if (this.engineTemp >= 110)
            return dangerStyle;
        else
            return normalStyle;
    }
    checkTelemetryStatus() {
        if (this.status === "Offline"){
            return dangerStyle;
        }else{
            return normalStyle;
        }
    }

    render() {
        return (
            <div style={style}>
                <strong>Power Train</strong>
                <Grid fluid>
                    <Row>
                        <Col xs={9} md="50%" style={normalStyle}>
                            <strong>
                                RPM<p></p>
                                {this.rpm}
                            </strong>
                        </Col>
                        <Col xs={9} md="50%" style={this.checkEngineTemp()}>
                            <strong>
                                Engine Temperature<p></p>
                                {this.engineTemp} &deg;C
                            </strong>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={9} md="50%" style={normalStyle}>
                            <strong>
                                Oil Pressure<p></p>
                                {this.oilPres}
                            </strong>
                        </Col>
                        <Col xs={9} md="50%" style={normalStyle}>
                            <strong>
                                Oil Temperature<p></p>
                                {this.oilTemp} &deg;C
                            </strong>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={9} md="50%" style={this.checkAFR()}>
                            <strong>
                                AFR<p></p>
                                {this.afr}
                            </strong>
                        </Col>
                        <Col xs={9} md="50%" style={normalStyle}>
                            <strong>
                                IAT<p></p>
                                {this.iat}
                            </strong>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={9} md="50%" style={normalStyle}>
                            <strong>
                                MAP<p></p>
                                {this.map}
                            </strong>
                        </Col>
                        <Col xs={9} md="50%" style={normalStyle}>
                            <strong>
                                TPS<p></p>
                                {this.tps}
                            </strong>
                        </Col>
                    </Row>
                </Grid>
                <p></p>
                <strong>Vehicle Dynamics</strong>
                <Grid fluid>
                    <Row>
                        <Col xs={9} md="33%" style={this.checkYAccel()}>
                            <strong>
                                X Acceleration<p></p>
                                {this.accelX}
                            </strong>
                        </Col>
                        <Col xs={9} md="33%" style={this.checkYAccel()}>
                            <strong>
                                Y Acceleration<p></p>
                                {this.accelY}
                            </strong>
                        </Col>
                        <Col xs={9} md="33%" style={normalStyle}>
                            <strong>
                                Z Acceleration<p></p>
                                {this.accelZ}
                            </strong>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={9} md="50%" style={normalStyle}>
                            <strong>
                                Speed<p></p>
                                {this.speed} KPH
                            </strong>
                        </Col>
                        <Col xs={9} md="50%" style={normalStyle}>
                            <strong>
                                Roll<p></p>
                                {this.roll}
                            </strong>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={9} md="50%" style={normalStyle}>
                            <strong>
                                Pitch<p></p>
                                {this.pitch}
                            </strong>
                        </Col>
                        <Col xs={9} md="50%" style={normalStyle}>
                            <strong>
                                Yaw<p></p>
                                {this.yaw}
                            </strong>
                        </Col>
                    </Row>
                </Grid>
                <p></p>
                <strong>Diagnostics</strong>
                <Grid fluid>
                    <Row>
                        <Col xs={9} md="50%" style={normalStyle}>
                            <strong>
                                Battery<p></p>
                                {this.battery} V
                            </strong>
                        </Col>
                        <Col xs={9} md="50%" style={this.checkTelemetryStatus()}>
                            <strong>
                                Telemetry Runner<p></p>
                                {this.telemetryStatus}
                            </strong>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={9} md="50%" style={normalStyle}>
                            <strong>
                                PDM Voltage<p></p>
                                {this.battery} V
                            </strong>
                        </Col>
                        <Col xs={9} md="50%" style={normalStyle}>
                            <strong>
                                PDM Temperature<p></p>
                                {this.pdmTemp} &deg;C
                            </strong>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={9} md="50%" style={normalStyle}>
                            <strong>
                                Latitude<p></p>
                                {this.latitude}
                            </strong>
                        </Col>
                        <Col xs={9} md="50%" style={normalStyle}>
                            <strong>
                                Longitude<p></p>
                                {this.longitude}
                            </strong>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
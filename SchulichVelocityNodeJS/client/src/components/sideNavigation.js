import React from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

class SideNavigation extends React.Component {
    render() {
        var x = (<div></div>);
        if (window.location.href.indexOf("historical") !== -1 || window.location.href.indexOf("streaming") !== -1) {
            x = (
                <SideNav
                    onSelect={(selected) => {
                        switch(selected){
                            case "selectData":
                                break;
                            case "suspension":
                                break;
                            case "tPos":
                                break;
                            case "ipw":
                                break;
                            case "baro":
                                break;
                            case "map":
                                break;
                            case "airToFuel":
                                break;
                            case "iat":
                                break;
                            case "engineTemp":
                                break;
                            case "oilPressure":
                                break;
                            case "oilTemp":
                                break;
                            case "fuelTemp":
                                break;
                            case "acceleration":
                                break;
                            case "yaw":
                                break;
                            case "pitch":
                                break;
                            case "roll":
                                break;
                            case "trackMap":
                                break;
                            case "speed":
                                break;
                            case "distance":
                                break;
                        }
                    }}>
                    <SideNav.Toggle />
                    <SideNav.Nav defaultSelected="none">
                        <NavItem className="selectdata" eventKey="selectData">
                            <NavIcon>
                            </NavIcon>
                            <NavText>
                                Select Historical Data
                        </NavText>
                        </NavItem>
                        <NavItem eventKey="suspension">
                            <NavIcon>
                            </NavIcon>
                            <NavText>
                                Suspension
                        </NavText>
                        </NavItem>
                        <NavItem eventKey="powerTrain">
                            <NavIcon>
                            </NavIcon>
                            <NavText>
                                Power Train
                        </NavText>
                            <NavItem eventKey="rpm">
                                <NavText>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RPM
                            </NavText>
                            </NavItem>
                            <NavItem eventKey="tPos">
                                <NavText>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Throttle Position
                            </NavText>
                            </NavItem>
                            <NavItem eventKey="ipw">
                                <NavText>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Injector Pulse Width
                            </NavText>
                            </NavItem>
                            <NavItem eventKey="baro">
                                <NavText>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Barometer
                            </NavText>
                            </NavItem>
                            <NavItem eventKey="map">
                                <NavText>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Manifold Air Pressure
                            </NavText>
                            </NavItem>
                            <NavItem eventKey="airToFuel">
                                <NavText>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Air To Fuel
                            </NavText>
                            </NavItem>
                            <NavItem eventKey="iat">
                                <NavText>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Intake Air Temperature
                            </NavText>
                            </NavItem>
                            <NavItem eventKey="engineTemp">
                                <NavText>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Engine Temperature
                            </NavText>
                            </NavItem>
                            <NavItem eventKey="oilPressure">
                                <NavText>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Oil Pressure
                            </NavText>
                            </NavItem>
                            <NavItem eventKey="oilTemp">
                                <NavText>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Oil Temperature
                            </NavText>
                            </NavItem>
                            <NavItem eventKey="fuelTemp">
                                <NavText>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fuel Temperature
                            </NavText>
                            </NavItem>
                        </NavItem>
                        <NavItem eventKey="acceleration">
                            <NavIcon>
                            </NavIcon>
                            <NavText>
                                Acceleration
                        </NavText>
                        </NavItem>
                        <NavItem eventKey="yaw">
                            <NavIcon>
                            </NavIcon>
                            <NavText>
                                Yaw
                        </NavText>
                        </NavItem>
                        <NavItem eventKey="pitch">
                            <NavIcon>
                            </NavIcon>
                            <NavText>
                                Pitch
                        </NavText>
                        </NavItem>
                        <NavItem eventKey="roll">
                            <NavIcon>
                            </NavIcon>
                            <NavText>
                                Roll
                        </NavText>
                        </NavItem>
                        <NavItem eventKey="trackMap">
                            <NavIcon>
                            </NavIcon>
                            <NavText>
                                Track Map
                        </NavText>
                        </NavItem>
                        <NavItem eventKey="speed">
                            <NavIcon>
                            </NavIcon>
                            <NavText>
                                Speed
                        </NavText>
                        </NavItem>
                        <NavItem eventKey="distance">
                            <NavIcon>
                            </NavIcon>
                            <NavText>
                                Distance
                        </NavText>
                        </NavItem>
                    </SideNav.Nav>
                </SideNav>
            );
            var style = (function () {
                var style = document.createElement("style");
                style.appendChild(document.createTextNode(""));
                document.head.appendChild(style);
                return style;
            })();
            if (window.location.href.indexOf("streaming") !== -1) {
                var idx = style.sheet.insertRule(".selectdata { display:none;}", 0);
            }
            else {
                style.sheet.cssRules[idx] = "";
            }
        }
        return x;
    }
}

export default SideNavigation;



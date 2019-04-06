import React from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

export default class SideNavigation extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() { 

    }

    componentWillUnmount() {

    }

    render() {
        var x = (<div></div>);
        if (window.location.href.indexOf("historical") !== -1 || window.location.href.indexOf("streaming") !== -1) {
            var path = "";
            if(window.location.href.indexOf("historical") !== -1) path = "historical";
            else path = "streaming";
            x = (
            <Router>
                <Route render = {({location, history}) => (
                    <React.Fragment>
                            <SideNav onSelect={(selected) => {
                                var to = '/' + selected;
                                if (location.pathname !== to) {
                                    history.push('/');
                                    history.push(path + to);
                                }
                            }}>
                    <SideNav.Toggle />
                    <SideNav.Nav defaultSelected="none">
                    <NavItem className="selectdata" eventKey="selectData">
                        <NavIcon>
                        </NavIcon>
                        <NavText>Select Historical Data</NavText>
                    </NavItem>
                    <NavItem eventKey="suspension">
                        <NavIcon>
                        </NavIcon>
                        <NavText>Suspension</NavText>
                    </NavItem>
                    <NavItem eventKey="powertrain">
                        <NavIcon>
                        </NavIcon>
                        <NavText>
                            Power Train
                        </NavText>
                        <NavItem eventKey="powertrain/rpm">
                            <NavText>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RPM
                        </NavText>
                        </NavItem>
                        <NavItem eventKey="powertrain/tPos">
                            <NavText>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Throttle Position
                        </NavText>
                        </NavItem>
                        <NavItem eventKey="powertrain/ipw">
                            <NavText>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Injector Pulse Width
                        </NavText>
                        </NavItem>
                        <NavItem eventKey="powertrain/baro">
                            <NavText>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Barometer
                        </NavText>
                        </NavItem>
                        <NavItem eventKey="powertrain/map">
                            <NavText>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Manifold Air Pressure
                        </NavText>
                        </NavItem>
                        <NavItem eventKey="powertrain/airToFuel">
                            <NavText>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Air To Fuel
                        </NavText>
                        </NavItem>
                        <NavItem eventKey="powertrain/iat">
                            <NavText>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Intake Air Temperature
                        </NavText>
                        </NavItem>
                        <NavItem eventKey="powertrain/engineTemp">
                            <NavText>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Engine Temperature
                        </NavText>
                        </NavItem>
                        <NavItem eventKey="powertrain/oilPressure"> 
                            <NavText>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Oil Pressure
                        </NavText>
                        </NavItem>
                        <NavItem eventKey="powertrain/oilTemp">
                            <NavText>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Oil Temperature
                        </NavText>
                        </NavItem>
                        <NavItem eventKey="powertrain/fuelTemp">
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
                    <main>
                        <Route path="/selectData"/>
                        <Route path="/suspension"/>
                        <Route path="/powertrain/rpm"/>
                        <Route path="/powertrain/tPos"/>
                        <Route path="/powertrain/ipw"/>
                        <Route path="/powertrain/baro"/>
                        <Route path="/powertrain/map"/>
                        <Route path="/powertrain/airToFuel"/>
                        <Route path="/powertrain/iat"/>
                        <Route path="/powertrain/engineTemp"/>
                        <Route path="/powertrain/oilPressure"/>
                        <Route path="/powertrain/oilTemp"/>
                        <Route path="/powertrain/fuelTemp"/>
                        <Route path="/acceleration"/>
                        <Route path="/yaw"/>
                        <Route path="/pitch"/>
                        <Route path="/roll"/>
                        <Route path="/trackMap"/>
                        <Route path="/speed"/>
                        <Route path="/distance"/>
                    </main>
                </React.Fragment>
                )}/>
            </Router>
            );

            var style = (function () {
                var style = document.createElement("style");
                style.appendChild(document.createTextNode(""));
                document.head.appendChild(style);
                return style;
            })();

            if (window.location.href.indexOf("streaming") !== -1) 
                var idx = style.sheet.insertRule(".selectdata { display:none;}", 0);
            else 
                style.sheet.cssRules[idx] = "";
        }
        return x;
    }
}




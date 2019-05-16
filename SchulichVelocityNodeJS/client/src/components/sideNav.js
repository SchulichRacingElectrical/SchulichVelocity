import React from 'react';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

export default class SideNavigation extends React.Component {
    constructor(props) {
        super(props);
        this.hideSelectData = true;
    }

    render() {
        if (window.location.href.indexOf('streaming') === -1)
            this.hideSelectData = false;
        else
            this.hideSelectData = true;
        var content = (
            <React.Fragment>
                <SideNav onSelect={(selected) => this.props.sideNav(selected)} >
                    <SideNav.Toggle/>
                    <SideNav.Nav defaultSelected="none">
                        <NavItem className="selectdata" eventKey="Select Data">
                            <NavIcon></NavIcon>
                            <NavText>Select Historical Data</NavText>
                        </NavItem>
                        <NavItem eventKey="Suspension">
                            <NavIcon></NavIcon>
                            <NavText>Suspension</NavText>
                        </NavItem>
                        <NavItem eventKey="powertrain">
                            <NavIcon></NavIcon>
                            <NavText>
                                Power Train
                        </NavText>
                            <NavItem eventKey="RPM">
                                <NavText>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RPM
                            </NavText>
                            </NavItem>
                            <NavItem eventKey="Throttle Position">
                                <NavText>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Throttle Position
                            </NavText>
                            </NavItem>
                            <NavItem eventKey="Injector Pulse Width">
                                <NavText>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Injector Pulse Width
                            </NavText>
                            </NavItem>
                            <NavItem eventKey="Barometer">
                                <NavText>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Barometer
                            </NavText>
                            </NavItem>
                            <NavItem eventKey="Manifold Air Pressure">
                                <NavText>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Manifold Air Pressure
                            </NavText>
                            </NavItem>
                            <NavItem eventKey="Air To Fuel">
                                <NavText>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Air To Fuel
                            </NavText>
                            </NavItem>
                            <NavItem eventKey="Intake Air Pressure">
                                <NavText>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Intake Air Temperature
                            </NavText>
                            </NavItem>
                            <NavItem eventKey="Engine Temperature">
                                <NavText>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Engine Temperature
                            </NavText>
                            </NavItem>
                            <NavItem eventKey="Oil Pressure">
                                <NavText>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Oil Pressure
                            </NavText>
                            </NavItem>
                            <NavItem eventKey="Oil Temperature">
                                <NavText>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Oil Temperature
                            </NavText>
                            </NavItem>
                            <NavItem eventKey="Fuel Temperature">
                                <NavText>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fuel Temperature
                            </NavText>
                            </NavItem>
                        </NavItem>

                        <NavItem eventKey="Acceleration">
                            <NavIcon>
                            </NavIcon>
                            <NavText>
                                Acceleration
                            </NavText>
                            <NavItem eventKey="Accel vs Time">
                                <NavText>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Accel vs Time
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="Acceleration Map">
                            <NavText>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Acceleration Map
                            </NavText>
                        </NavItem>
                        </NavItem>

                        <NavItem eventKey="Axes">
                            <NavIcon>
                            </NavIcon>
                            <NavText>
                                Axes
                            </NavText>
                            <NavItem eventKey="Yaw">
                                <NavText>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Yaw
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="Pitch">
                                <NavText>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pitch
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="Roll">
                                <NavText>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Roll
                                </NavText>
                            </NavItem>
                        </NavItem>

                        <NavItem eventKey="Track Map">
                            <NavIcon>
                            </NavIcon>
                            <NavText>
                                Track Map
                        </NavText>
                        </NavItem>
                        <NavItem eventKey="Speed">
                            <NavIcon>
                            </NavIcon>
                            <NavText>
                                Speed
                    </NavText>
                        </NavItem>
                        <NavItem eventKey="Distance">
                            <NavIcon>
                            </NavIcon>
                            <NavText>
                                Distance
                    </NavText>
                        </NavItem>
                    </SideNav.Nav>
                </SideNav>
            </React.Fragment>
        );
        var style = (function () {
            var style = document.createElement("style");
            style.appendChild(document.createTextNode(""));
            document.head.appendChild(style);
            return style;
        })();
        if (this.hideSelectData === true)
            var idx = style.sheet.insertRule(".selectdata { display:none;}", 0);
        else
            style.sheet.cssRules[idx] = "";

        return content;
    }
}




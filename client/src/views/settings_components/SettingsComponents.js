import React, { Component } from 'react';
import SettingsNav from './SettingsNav';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, CustomInput } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

import { theme } from '../../services/theme';
import { history } from '../../services/history';


export class AccountPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            email: '',
            phone: ''
        }
        this.fill();
    }

    fill = async() => {
        const userDetails = await JSON.parse(localStorage.getItem('user'));
        this.setState({
            firstname: userDetails.firstname,
            email: userDetails.email,
            phone: userDetails.phone
        });
    }

    render() {
        const userDetails = JSON.parse(localStorage.getItem('user'));
        return (
            <div className="sub-setting-page">
                <SettingsNav />
               
                <Container className="settings-container">
                <h4>Personal</h4>
                    <Row>
                        <Col sm="12" md="6" className="offset-md-3">
                        
                        <Form>
                            
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="email" name="email" id="email" defaultValue={userDetails.email} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="phone">Phone number</Label>
                                <Input type="tel" name="phone" id="phone" defaultValue={userDetails.phone} />
                            </FormGroup>
                            <Button style={{float: 'right'}}>Save</Button>
                        </Form>
                        </Col>
                    </Row>
                    <h4>Password</h4>
                    <Row>
                        <Col sm="12" md="6" className="offset-md-3">
                        Forgotten your password? Click below to reset. <br />
                        <Button>Reset password</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export class BillingPage extends Component {
    render() {
        return (
            <div className="sub-setting-page">
                <SettingsNav />
                <h1 style={{textAlign: 'center', marginTop: "30px"}}>[not implemented]</h1>
            </div>
        );
    }
}

export class DisplayPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dark: localStorage.getItem('theme') === 'dark',
        }
    }

    toggle = () => {
        if (this.state.dark === true) {
            localStorage.setItem('theme', 'light');
            this.setState({
                dark: false,
            })
        } else {
            localStorage.setItem('theme', 'dark');
            this.setState({
                dark: true
            })
        }
        history.push('/map');
    }

    render() {
        return (
            <div className="sub-setting-page">
                <SettingsNav />
                
                <Container style={{marginTop: "2%"}} className="settings-container">
                <h4>Display</h4>
                    <Row>
                        <Col sm="12" md="6" className="offset-md-3">
                        <CustomInput onClick={this.toggle} checked={this.state.dark} type="switch" id="exampleCustomSwitch" name="customSwitch" label="enable dark mode" className="dark-toggle" />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export class AboutPage extends Component {
    render() {
        return (
            <div className="sub-setting-page">
                <SettingsNav />
                <Container style={{marginTop: "2%"}} className="settings-container">
                    <Row>
                        
                        <Col sm="12" md="6" className="offset-md-3">
                        <h4>About</h4>
                            <p>
                                We're an Edinburgh-based startup interested in smart, innovative
                                solutions to common problems.
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12" md="6" className="offset-md-3">
                            <p align="center">Find our company website&nbsp;<a href="http://www2.macs.hw.ac.uk/~lh54/company%20web/home.html?fbclid=IwAR2_ZdifYGjPY0FBUTYXVdzKWjmKm2CyTAOUPHgaCwFb49yXPqTp7JhXFdc">here</a>.</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export class FAQPage extends Component {
    render() {
        return (
            <div className="sub-setting-page">
                <SettingsNav />
                <Container className="settings-container">
                    <h4>FAQ</h4>
                    <Row>
                        <Col sm="12" md="6" className="offset-md-3">
                            <h5>Who</h5>
                            <p>
                                We are Chay Rice, Conor O'Brien, Jacob Cooper, Charlie Cowan, 
                                Lewis Hendry, and Jamie Muir.
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12" md="6" className="offset-md-3">
                            <h5>Where</h5>
                            <p>
                                Our Headquarters is in Riccarton, Edinburgh. 
                                The first city covered by our service was Edinburgh.
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12" md="6" className="offset-md-3">
                            <h5>When</h5>
                            <p>
                                Pyrois Technologies was established in 2018. The pyroiscycles service 
                                was first introduced in early 2019.
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12" md="6" className="offset-md-3">
                            <h5>Why</h5>
                            <p>
                                We had a vision. A vision for a world without conflict, pain or death.
                                Also, we were contracted.
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12" md="6" className="offset-md-3">
                            <h5>How</h5>
                            <p>
                                W3Schools and StackOverflow. And some Googling.
                                And a little bit of Bing but let's just keep that between us.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
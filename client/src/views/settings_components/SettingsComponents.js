import React, { Component } from 'react';
import SettingsNav from './SettingsNav';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';



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
                    <Row>
                        <Col sm="12" md="6" className="offset-md-3">
                        <h4>Personal</h4>
                        <Form>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input type="text" name="name" id="name" defaultValue={this.state.firstname}/>
                                
                            </FormGroup>
                            
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
                    <Row>
                        <Col sm="12" md="6" className="offset-md-3">
                        <h4>Password</h4>
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
                <h1>creeper? Awww man</h1>
            </div>
        );
    }
}

export class DisplayPage extends Component {
    render() {
        return (
            <div className="sub-setting-page">
                <SettingsNav />
                <h1>DISPLAY</h1>
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
                        <h4 align="center">About</h4>
                            <p align="center">
                                We're just a couple a' dudes being guys.
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12" md="6" className="offset-md-3">
                            <p align="center">Find our company website&nbsp;<a href="https://i.imgur.com/EzQZz.jpg">here</a>.</p>
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
                <h1>FAQ</h1>
            </div>
        );
    }
}
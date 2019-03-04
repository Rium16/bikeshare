import React, { Component } from 'react';
import { InputGroupAddon, Container, Button, Form, FormGroup, Input, InputGroup, Row, Col  } from 'reactstrap';
import { IoIosPerson } from 'react-icons/io';
import 'bootstrap/dist/css/bootstrap.css'

class Summary extends Component {

    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }

    goBack = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    render() {
        return (
            <Container style={this.props.style} className={this.props.className}>
                <Row>
                    Email: {this.props.values.email}
                </Row>
                <Row>
                    Phone: {this.props.values.phone}
                </Row>
                <Row>
                    Name: {this.props.values.firstName}
                </Row>
                <Row>
                    Surname: {this.props.values.lastName}
                </Row>
                <Row>
                    Password: {this.props.values.password}
                </Row>
                <Row>
                    confirmPassword: {this.props.values.confirmPassword}
                </Row>
                <Row>
                    <Button>Submit!</Button>
                </Row>
            </Container>
        );
    }
}

export default Summary;
import React, { Component } from 'react';
import { Container, Button, Row, } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';


class Summary extends Component {

    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }

    goBack = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    handleSubmit = (input) => {
        this.props.handleSubmit(input);
    }

    render() {
        return (
            <Container style={this.props.style} className={this.props.className}>
            <h4 class="card-title mb-4 mt-1">summary</h4>
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
                {/* probably get rid of this */}
                <Row>
                    Password: {this.props.values.password}
                </Row>
                {/* probably get rid of this */}
                <Row>
                    confirmPassword: {this.props.values.confirmPassword}
                </Row>
                <Row>
                    
                    <Button onClick={this.goBack} color="secondary" className="float-right">prev</Button>
                    <Button onClick={this.props.handleSubmit} color="info">Submit!</Button>
                </Row>
            </Container>
        );
    }
}


export default Summary;
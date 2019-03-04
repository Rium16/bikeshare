// adapted from https://scotch.io/tutorials/creating-multistep-forms-with-react-and-semantic-ui
import React, { Component } from 'react';
import { Container, Button, Form, FormGroup, Input, InputGroup, Row, Col  } from 'reactstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'

class Contact extends Component {

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
                    <Form>
                    <h4 class="card-title mb-4 mt-1">contact info</h4>
                    <FormGroup>
                        <input 
                        required
                        name="" 
                        class="form-control signup-input" 
                        placeholder="email" 
                        type="email"
                        onChange={this.props.handleChange('email')}
                        defaultValue={this.props.values.email}
                        />
                    </FormGroup>
                    <FormGroup>
                        <input 
                        class="form-control" 
                        placeholder="phone" 
                        type="tel"
                        onChange={this.props.handleChange('phone')}
                        defaultValue={this.props.values.phone}
                        />
                    </FormGroup>
                    <FormGroup>
                            <Button onClick={this.saveAndContinue} color="info" className="float-right">next</Button>
                            <Button disabled onClick={this.prevStep} color="secondary" className="float-right">prev</Button>
                        </FormGroup>                                                       
                    </Form>
            </Container>
        );
    }
}

export default Contact;
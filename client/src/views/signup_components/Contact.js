// adapted from https://scotch.io/tutorials/creating-multistep-forms-with-react-and-semantic-ui
import React, { Component } from 'react';
import { Container, Button, Form, FormGroup } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css'

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitted: false
        }
        
    }

    saveAndContinue = (e) => {
        e.preventDefault();
        this.setState({
            submitted: true
        });

        if (this.props.emailIsValid() && this.props.phoneIsValid()) {
            this.props.nextStep();
        }

        
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
                        {!this.props.values.email && this.state.submitted &&
                            <div className="help-block"><span className="help-text">email is required</span></div>
                        }
                        {!this.props.emailIsValid() && this.state.submitted && this.props.values.email &&
                            <div className="help-block"><span className="help-text">invalid email address</span></div>
                        }
                    </FormGroup>
                    <FormGroup>
                        <input 
                        class="form-control" 
                        placeholder="phone" 
                        type="tel"
                        onChange={this.props.handleChange('phone')}
                        defaultValue={this.props.values.phone}
                        />
                        {!this.props.values.phone && this.state.submitted &&
                            <div className="help-block"><span className="help-text">phone number is required</span></div>
                        }
                        {!this.props.phoneIsValid() && this.state.submitted && this.props.values.phone &&
                            <div className="help-block"><span className="help-text">invalid phone number</span></div>
                        }
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
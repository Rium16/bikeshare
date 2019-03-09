// adapted from https://scotch.io/tutorials/creating-multistep-forms-with-react-and-semantic-ui
import React, { Component } from 'react';
import { Container, Button, Form, FormGroup,  } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css'

class Personal extends Component {
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
        })
        if (this.props.firstNameIsValid() && this.props.lastNameIsValid()) {
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
                <h4 class="card-title mb-4 mt-1">personal</h4>
                    <FormGroup>
                        <input 
                        onChange={this.props.handleChange('firstName')}
                        name="firstName" 
                        class="form-control" 
                        placeholder="first name" 
                        pattern="[A-Za-z\s]" 
                        type=""
                        defaultValue={this.props.values.firstName}
                        />
                        {!this.props.values.firstName && this.state.submitted &&
                            <div className="help-block"><span className="help-text">first name is required</span></div>
                        }
                        {!this.props.firstNameIsValid() && this.state.submitted && this.props.values.firstName &&
                            <div className="help-block"><span className="help-text">invalid name string</span></div>
                        }
                    </FormGroup>

                    <FormGroup>
                        <input 
                        onChange={this.props.handleChange('lastName')} 
                        class="form-control" 
                        placeholder="last name" 
                        type=""
                        defaultValue={this.props.values.lastName}
                        />
                        {!this.props.values.lastName && this.state.submitted &&
                            <div className="help-block"><span className="help-text">last name is required</span></div>
                        }
                        {!this.props.lastNameIsValid() && this.state.submitted && this.props.values.lastName &&
                            <div className="help-block"><span className="help-text">invalid name string</span></div>
                        }
                    </FormGroup>  
                    <FormGroup>
                        <Button onClick={this.saveAndContinue} color="info" className="float-right">next</Button>
                        <Button onClick={this.goBack} color="secondary" className="float-right">prev</Button>
                    </FormGroup>                                                       
                </Form>
            </Container>
        );
    }
}

export default Personal;
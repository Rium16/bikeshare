// adapted from https://scotch.io/tutorials/creating-multistep-forms-with-react-and-semantic-ui
import React, { Component } from 'react';
import { Container, Button, Form, FormGroup,  } from 'reactstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'

class Personal extends Component {

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
                    </FormGroup>

                    <FormGroup>
                        <input 
                        onChange={this.props.handleChange('lastName')} 
                        class="form-control" 
                        placeholder="last name" 
                        type=""
                        defaultValue={this.props.values.lastName}
                        />
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
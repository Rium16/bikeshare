// adapted from https://scotch.io/tutorials/creating-multistep-forms-with-react-and-semantic-ui
import React, { Component } from 'react';
import { Container, Form, FormGroup, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'

class Password extends Component {

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
                    <h4 class="card-title mb-4 mt-1">password</h4>
                    <FormGroup>
                        <input 
                        onChange={this.props.handleChange('password')} 
                        name="password" 
                        class="form-control" 
                        placeholder="password" 
                        type="password"
                        defaultValue={this.props.values.password}
                        />
                    </FormGroup>
                    <FormGroup>
                        <input 
                        onChange={this.props.handleChange('confirmPassword')} 
                        class="form-control" 
                        placeholder="confirm password" 
                        type="password"
                        defaultValue={this.props.values.confirmPassword}
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

export default Password;
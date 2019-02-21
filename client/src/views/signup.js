// adapted from https://scotch.io/tutorials/creating-multistep-forms-with-react-and-semantic-ui
import React, { Component } from 'react';
import Contact from './signup_components/Contact';
import Personal from './signup_components/Personal';
import Password from './signup_components/Password';

import { Card, FormGroup, Button, Container } from 'reactstrap';

// enum for registration step
const stepEnum = {
    CONTACT: 1,
    PERSONAL: 2,
    PASSWORD: 3,
    FINAL: 4,
}

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: stepEnum.CONTACT,
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        // return success code or failure code
    }

    next = () => {
        this.setState({
            step: this.state.step + 1
        });
    }

    prev = () => {
        this.setState({
            step: this.state.step - 1
        });
    }
    
    handleChange = input => event => {
        this.setState({ [input] : event.target.value })
    }

    render() {
        const { step, firstName, lastName, email, phone, password, confirmPassword } = this.state;
        const values = { firstName, lastName, email, phone, password, confirmPassword };

        // each case is a step in the multi-step sign up form
        switch(step) {
            case stepEnum.CONTACT:
                return (
                    <Container className="h-100">
                        <Contact
                        className="h-100"
                        nextStep={this.next}
                        handleChange={this.handleChange}
                        values={values}
                        />         
                    </Container>
                );


            case stepEnum.PERSONAL:
                return (
                    <Card>
                        <Personal
                        nextStep={this.next}
                        handleChange={this.handleChange}
                        values={values}
                        />         
                        <FormGroup>
                            <Button onClick={this.next} color="info" className="float-right">next</Button>
                            <Button onClick={this.prev} color="secondary" className="float-right">prev</Button>
                        </FormGroup>    
                    </Card>
                );

            
            case stepEnum.PASSWORD:
                return (
                    <Card>
                        <Password
                        nextStep={this.next}
                        handleChange={this.handleChange}
                        values={values}
                        />         
                        <FormGroup>
                            <Button onClick={this.next} color="info" className="float-right">next</Button>
                            <Button onClick={this.prev} color="secondary" className="float-right">prev</Button>
                        </FormGroup>    
                    </Card>
                );

            case stepEnum.FINAL:
                return (
                    <Card>
                        {/* finalise page */}
                        <FormGroup>
                            <Button onClick={this.next} color="info" className="float-right">next</Button>
                            <Button onClick={this.prev} color="secondary" className="float-right">prev</Button>
                        </FormGroup>    
                    </Card>
                );
        }
    }
}

export default SignUp;
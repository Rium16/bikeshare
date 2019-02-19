// adapted from https://scotch.io/tutorials/creating-multistep-forms-with-react-and-semantic-ui
import React, { Component } from 'react';
import Contact from './signup_components/Contact';
import Personal from './signup_components/Personal';
import Password from './signup_components/Password';

import { Card, FormGroup, Button } from 'reactstrap';

// enum for registration step
const stepEnum = {
    CONTACT: 1,
    PERSONAL: 2,
    PASSWORD: 3,
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

        switch(step) {
            case stepEnum.CONTACT:
                return (
                    <Card>
                        <Contact
                        nextStep={this.next}
                        handleChange={this.handleChange}
                        values={values}
                        />         
                        <FormGroup>
                            <Button onClick={this.next} color="info" className="float-right">next</Button>
                            <Button disabled={this.state.step === stepEnum.CONTACT ? true : false} onClick={this.prev} color="secondary" className="float-right">prev</Button>
                        </FormGroup>    
                    </Card>
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
                            <Button disabled={this.state.step === stepEnum.CONTACT ? true : false} onClick={this.prev} color="secondary" className="float-right">prev</Button>
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
                            <Button disabled={this.state.step === stepEnum.CONTACT ? true : false} onClick={this.prev} color="secondary" className="float-right">prev</Button>
                        </FormGroup>    
                    </Card>
                );

        }
    }
}

export default SignUp;
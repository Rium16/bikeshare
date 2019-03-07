// adapted from https://scotch.io/tutorials/creating-multistep-forms-with-react-and-semantic-ui
import React, { Component } from 'react';
import Contact from './signup_components/Contact';
import Personal from './signup_components/Personal';
import Password from './signup_components/Password';
import Summary from './signup_components/Summary';

import { Jumbotron } from 'reactstrap';

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
            step: 1,
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
                    <Jumbotron className="vertical-center">
                        <Contact
                        nextStep={this.next}
                        prevStep={this.prev}
                        handleChange={this.handleChange}
                        values={values}
                        />         
                    </Jumbotron>
                );

            case stepEnum.PERSONAL:
                return (
                    <Jumbotron className="vertical-center">
                        <Personal
                        nextStep={this.next}
                        prevStep={this.prev}
                        handleChange={this.handleChange}
                        values={values}
                        />         
                    </Jumbotron>
                );
            
            case stepEnum.PASSWORD:
                return (
                    <Jumbotron className="vertical-center">
                        <Password
                        nextStep={this.next}
                        prevStep={this.prev}
                        handleChange={this.handleChange}
                        values={values}
                        />         
                    </Jumbotron>
                );

            case stepEnum.FINAL:
                return (
                    <Jumbotron className="vertical-center">
                        <Summary
                        prevStep={this.prev}
                        handleChange={this.handleChange}
                        values={values}
                        />         
                    </Jumbotron>
                );

            default:
                return (
                    <h1>Reached an invalid sign-up step</h1>
                )
        }
    }
}

export default SignUp;
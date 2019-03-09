// adapted from https://scotch.io/tutorials/creating-multistep-forms-with-react-and-semantic-ui
import React, { Component } from 'react';
import Contact from './signup_components/Contact';
import Personal from './signup_components/Personal';
import Password from './signup_components/Password';
import Summary from './signup_components/Summary';
import { Jumbotron } from 'reactstrap';

import { connect } from 'react-redux';
import { register } from '../_actions/userActions';

// enum for registration step
const stepEnum = {
    CONTACT: 1,
    PERSONAL: 2,
    PASSWORD: 3,
    FINAL: 4,
}

class SignupContainer extends Component {
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

    emailIsValid = () => {
        const emailreg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const testemail = emailreg.test(this.state.email);

        return testemail;
    }

    phoneIsValid = () => {
        const phonereg = /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/;
        const testphone = phonereg.test(this.state.phone);

        return testphone;
    }

    firstNameIsValid = () => {
        // proper validation pls
        return 3 <= this.state.firstName.length && this.state.firstName.length <= 30
    }

    lastNameIsValid = () => {
        // props validation pls
        
        return 3 <= this.state.lastName.length && this.state.lastName.length <= 30
    }

    passwordsMatch = () => {
        return this.state.password === this.state.confirmPassword;
    }

    passwordIsValid = () => {
        // could do with proper password regex
        return this.state.password.length >= 8;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            email: this.state.email,
            phone: this.state.phone,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password
        }
        this.props.dispatch(register(user));
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
                        phoneIsValid={this.phoneIsValid}
                        emailIsValid={this.emailIsValid}
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
                        firstNameIsValid={this.firstNameIsValid}
                        lastNameIsValid={this.lastNameIsValid}
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
                        passwordsMatch={this.passwordsMatch}
                        passwordIsValid={this.passwordIsValid}
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
                        handleSubmit={this.handleSubmit}
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

function mapStateToProps(state) {
    const { registering, registered } = state.registration;
    return {
        registering,
        registered
    }
}


export default connect (mapStateToProps) (SignupContainer);
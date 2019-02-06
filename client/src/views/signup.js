import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class Signup extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        firstName: null,
        surname:null,
        email:null,
        mobile:null,
        cardNumber:null,
        expiryDate:null,
        cvc:null,
        username:null,
        password:null,
      };
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      this.setState({
        [name]: value
      });
    }
    
    render() {
        return (
            <div className="signin">
                <h1 className="signinhead">SIGN UP</h1>
                <Form method="POST">
                    <FormGroup>
                        <label className="padded"> First Name
                            <input
                                type="text"
                                onChange={this.state.firstName}
                                name="firstName"
                                pattern="[A-Za-z\s]"
                                placeholder=""
                                required />
                        </label>
                    </FormGroup>
                    <FormGroup>
                        <label className="padded">Surname
                            <input
                                type="text"
                                onChange={this.state.surname}
                                name="surname"
                                pattern="[A-za-z\s]"
                                required />
                        </label>
                    </FormGroup>
                    <FormGroup>
                        <label className="padded">Email
                            <input
                                type="email"
                                onChange={this.state.email}
                                name="email"
                                placeholder="user@domain.com"
                                required />
                        </label>
                    </FormGroup>
                    <FormGroup>
                        <label className="padded">Mobile Phone Number
                            <input
                                type="tel"
                                onChange={this.state.mobile}
                                name="mobile"
                                placeholder="11 Numbers"
                                required />
                        </label>
                    </FormGroup>
                    <FormGroup>
                        <label className="padded">Card Number
                            <input
                                type="number"
                                onChange={this.state.cardNumber}
                                name="cardNumber"
                                placeholder="16 Numbers"
                                required />
                        </label>
                    </FormGroup>
                    <FormGroup>
                        <label className="padded">Expiry Date
                            <input
                                type="number"
                                onChange={this.state.expiryDate}
                                name="expiryDate"
                                placeholder="MM/YYYY"
                                required />
                        </label>
                    </FormGroup>
                    <FormGroup>
                        <label className="padded">Username
                            <input
                                type="text"
                                onChange={this.state.username}
                                name="username"
                                required />
                        </label>
                    </FormGroup>
                    <FormGroup>
                        <label className="padded">Password
                            <input
                                type="password"
                                onChange={this.state.password}
                                name="password"
                                required />
                        </label>
                    </FormGroup>
                    <Button>Sign Up</Button>
                </Form>
            </div>
        );

    }

    render_alternative() {  //Not currently used, form fields don't match db schema
        return (
            <div className="signin">
                <h1 className="signinhead">SIGN UP</h1>
                <Form method="POST">
                    <FormGroup>
                        <label className="padded"> First Name
                            <input
                                type="text"
                                onChange={this.state.firstName}
                                name="firstName"
                                pattern="[A-Za-z\s]"
                                placeholder=""
                                required />
                        </label>
                    </FormGroup>
                    <FormGroup>
                        <label className="padded">Surname
                            <input
                                type="text"
                                onChange={this.state.surname}
                                name="surname"
                                pattern="[A-za-z\s]"
                                required />
                        </label>
                    </FormGroup>
                    <FormGroup>
                        <label className="padded">Email
                            <input
                                type="email"
                                onChange={this.state.email}
                                name="email"
                                placeholder="user@domain.com"
                                required />
                        </label>
                    </FormGroup>
                    <FormGroup>
                        <label className="padded">Mobile Phone Number
                            <input
                                type="tel"
                                onChange={this.state.mobile}
                                name="mobile"
                                placeholder="11 Numbers"
                                required />
                        </label>
                    </FormGroup>
                    <FormGroup>
                        <label className="padded">Card Number
                            <input
                                type="number"
                                onChange={this.state.cardNumber}
                                name="cardNumber"
                                placeholder="16 Numbers"
                                required />
                        </label>
                    </FormGroup>
                    <FormGroup>
                        <label className="padded">Expiry Date
                            <input
                                type="number"
                                onChange={this.state.expiryDate}
                                name="expiryDate"
                                placeholder="MM/YYYY"
                                required />
                        </label>
                    </FormGroup>
                    <FormGroup>
                        <label className="padded">Username
                            <input
                                type="text"
                                onChange={this.state.username}
                                name="username"
                                required />
                        </label>
                    </FormGroup>
                    <FormGroup>
                        <label className="padded">Password
                            <input
                                type="password"
                                onChange={this.state.password}
                                name="password"
                                required />
                        </label>
                    </FormGroup>
                    <Button>Sign Up</Button>
                </Form>
            </div>
        );

    }
}
export default Signup;
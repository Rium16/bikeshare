import React, { Component } from 'react';

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
        <form>
          <label> First Name
            <input
              type="text"
              onChange={this.state.firstName}
              name="firstName"
              pattern= "[A-Za-z\s]"
              placeholder=""
              required/>
          </label>
          <br/>
          <label>Surname
            <input
              type="text"
              onChange={this.state.surname}
              name="surname"
              pattern="[A-za-z\s]"
              required/>
          </label>
          <br/>
          <label>Email
            <input
              type="email"
              onChange={this.state.email}
              name="email"
              placeholder="user@domain.com"
              required />
          </label>
          <br/>
          <label>Mobile Phone Number
            <input
              type="tel"
              onChange={this.state.mobile}
              name="mobile"
              placeholder="11 Numbers"
              required/>
          </label>
          <br/>
          <label>Card Number
            <input
              type="number"
              onChange={this.state.cardNumber}
              name="cardNumber"
              placeholder="16 Numbers"
              required />
          </label>
          <br/>
          <label>Expiry Date
            <input
              type="number"
              onChange={this.state.expiryDate}
              name="expiryDate"
              placeholder="MM/YYYY"
              required/>
          </label>
          <br/>
          <label>CVC
            <input
              type="number"
              onChange={this.state.cvc}
              name="cvc"
              placeholder="3 Numbers on the back"
              required/>
          </label>
          <br/>
          <label>Username
            <input
              type="text"
              onChange={this.state.username}
              name="username"
              required/>
          </label>
          <br/>
          <label>Password
            <input
              type="password"
              onChange={this.state.password}
              name="password"
              required/>
        </label>
        <br/>
        <button onClick={() => alert('Forum submitted')}>
          Submit
        </button>
        </form>
          );
        }
      }

export default Signup;
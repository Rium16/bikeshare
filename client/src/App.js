import React, { Component } from 'react';
import './App.css';
import { Modal } from 'reactstrap';

import MessageModal from './views/MessageModal'
import PMap from './views/PMap';
import Navigation from './views/Navigation';
import Signup from './views/signup';
import Login from './views/Login';
import LoginModal from './views/LoginModal';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

export default class App extends Component {
  state = {
    
  };

  render() {
    return (
      <div className="App">
        {Page()}
      </div>
    );
  }
}

function Page() {
  return (
    <Router>
      <div>
        <Navigation/>
        <Route path="/" render={() => (
          <Redirect to="/map" />
        )}/>
        <Route path="/map" component={BikeMap} />
        <Route path="/map/login" component={LogIn} />
        <Route path="/account" component={Account} />
        <Route path="/register" component={SignUp} />
      </div>
    </Router>
  );
}

function BikeMap() {
  return (
    <PMap className="map"></PMap>
  );
}

function LogIn() {
  return (
    <LoginModal className="login-modal col-md-5 col-md-offset-5" modal={true}/>
  );
}

function Account() {
  return (
    ""
  );
}

function SignUp() {
  return (
    <Signup />
  )
}

import React, { Component } from 'react';
import './App.css';
import { Modal } from 'reactstrap';

import AccountSummary from './views/AccountSummary';
import PMap from './views/PMap';
import Navigation from './views/Navigation';
import SignUp from './views/signup';
import Settings from './views/Settings';
import LoginModal from './views/LoginModal';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }

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
        <Route path="/settings" component={Settings} />
        <Route path="/register" component={Register} />
        <Route path="/account" component={AccountSummary} />
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
    <LoginModal className="col-md-5 col-md-offset-5" modal={true}/>
  );
}

function Register() {
  return (
    <SignUp />
  )
}

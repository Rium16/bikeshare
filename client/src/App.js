import React, { Component } from 'react';
import './App.css';
import { Modal } from 'reactstrap';

import PMap from './views/PMap';
import Navigation from './views/Navigation';
import SignUp from './views/signup';
import Settings from './views/Settings';
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
        <Route path="/settings" component={Account} />
        <Route path="/register" component={Register} />
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

function Account() {
  return (
    <Settings />
  );
}

function Register() {
  return (
    <SignUp />
  )
}

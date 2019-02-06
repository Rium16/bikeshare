import React, { Component } from 'react';
import './App.css';
import PMap from './views/PMap';
import Navigation from './views/Navigation';
import Signup from './views/signup';
import Login from './views/signin';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
        <Route exact path="/" component={BikeMap} />
        <Route path="/login" component={LogIn} />
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
    <Login />
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

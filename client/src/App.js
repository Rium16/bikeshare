import React, { Component } from 'react';
import './App.css';
import PMap from './views/PMap';
import Navigation from './views/Navigation';
import Signup from './views/signup';
import Example from './views/signin';
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
        <Route path="/login" component={Login} />
        <Route path="/account" component={Account} />
        <Route path="/signup" component={SignUp} />
      </div>
    </Router>
  );
}

function BikeMap() {
  return (
    <PMap className="map"></PMap>
  );
}

function Login() {
  return (
    <Example />
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

import React, { Component } from 'react';
import './App.css';
import PMap from './PMap';
import Navigation from './views/Navigation';
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
    <div className="loginpage"><p>LOGIN PAGE</p></div>
  );
}

function Account() {
  return (
    ""
  );
}

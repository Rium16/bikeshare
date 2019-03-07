import React, { Component } from 'react';
import './App.css';

import AccountSummary from './views/AccountSummary';
import PMap from './views/PMap';
import Navigation from './views/Navigation';
import SignUp from './views/signup';
import Settings from './views/Settings';
import LoginModal from './views/LoginModal';
import Staff from './views/Staff';

// redux stuff
import configStore from './configStore';
import { Provider } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

const store = configStore();

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          {Page()}
        </div>
      </Provider>
    );
  }
}

function Page() {
  // example of how we can change the default redirect based on who is 
  // logged in - obviously this needs changed but whatev
  const homepage = localStorage.getItem('user') ? "/staff" : "/map"
  return (
    <Router>
      <div>
		<Navigation />
        <Route path="/" render={() => (
          <Redirect to={homepage} />
        )}/>
        <Route path="/map" component={BikeMap} />
        <Route path="/map/login" component={LogIn} />
        <Route path="/settings" component={Settings} />
        <Route path="/register" component={Register} />
        <Route path="/account" component={AccountSummary} />

        <Route path="/staff" component={StaffPage} />

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

function StaffPage() {
    return (
      <Staff />  
    );
}

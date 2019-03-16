import React, { Component } from 'react';
import './App.css';

import AccountSummary from './views/AccountSummary';
import PMap from './views/PMap';
import Navigation from './views/Navigation';
import SignupContainer from './views/SignupContainer';
import Settings from './views/Settings';
import LoginContainer from './views/LoginContainer';
import Staff from './views/Staff';
import ReservationVoucher from './views/ReservationPage/ReservationVoucher';
import AlertBanner from './views/AlertBanner';

// redux stuff
import configStore from './configStore';
import { connect } from 'react-redux';
import { getReservations } from './_actions/userActions';

import { history } from './services/history';

import { Router, Route, Redirect } from "react-router-dom";

const store = configStore();

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }

  componentDidMount() {
    if (localStorage.getItem('user')) {
      this.props.dispatch(getReservations(JSON.parse(localStorage.getItem('user')).CID));
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
  // example of how we can change the default redirect based on who is 
  // logged in - obviously this needs changed but whatev
  const homepage = localStorage.getItem('user') ? "/map" : "/map"
  return (
    <Router history={history}>
      <div>
		<Navigation />
    <AlertBanner />
        <Route path="/" render={() => (
          <Redirect to={homepage} />
        )}/>
        <Route path="/map" component={BikeMap} />
        <Route path="/map/login" component={LogIn} />
        <Route path="/settings" component={Settings} />
        <Route path="/register" component={Register} />
        <Route path="/account" component={AccountSummary} />
        <Route path="/voucher" component={ReservationVoucher} />

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
    <LoginContainer className="col-md-5 col-md-offset-5" modal={true}/>
  );
}

function Register() {
  return (
    <SignupContainer />
  )
}

function StaffPage() {
    return (
      <Staff />  
    );
}

function mapStateToProps(state) {
  return {
  }
}

export default connect(mapStateToProps)(App);

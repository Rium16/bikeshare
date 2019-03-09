// repurposed example from https://reactstrap.github.io/components/modals/
import React, { Component } from 'react';
import { Modal, ModalFooter, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Login from './Login';

import { history } from '../services/history';
import { connect } from 'react-redux';
import { login } from '../_actions/userActions';

class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: props.modal,
            email: '',
            password: '',
            submitted: false
        };

    }
    
    toggle = () => {
        const tog = this.state.modal;
        this.setState({
            modal: !tog
        });
        history.push('/map');
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });

        if (this.state.email && this.state.password) {
            this.props.dispatch(login(this.state.email, this.state.password));
            this.setState({
                modal: !this.props.loggedIn,
            })
        }
    } 

    handleChange = input => event => {
        this.setState({ [input] : event.target.value });
    }

    render() {
        return (
            <Modal centered isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop={true}>
                <Login 
                loggedIn={this.props.loggedIn}
                loggingIn={this.props.loggingIn} 
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                email={this.state.email}
                password={this.state.password}
                submitted={this.state.submitted}
                />
                <ModalFooter>
                    <Button color="secondary" onClick={this.toggle} >close</Button>
                </ModalFooter>
            </Modal>
        );
    }
}


function mapStateToProps(state) {
    const { loggingIn, loggedIn } = state.authentication;
    return {
        loggingIn,
        loggedIn
    };
}

export default connect (mapStateToProps) (LoginContainer);
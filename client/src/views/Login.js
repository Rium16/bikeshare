// adapted from https://bootsnipp.com/user/snippets/3Aq2B
// Jamie Muir
import React, { Component } from 'react';
import { Card, Spinner, CardBody, Button, Form, FormGroup,  } from 'reactstrap';
import { Link } from 'react-router-dom';

import { login } from '../_actions/userActions';
import 'bootstrap/dist/css/bootstrap.css'

import { connect } from 'react-redux';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            submitted: false
        }
    }

    handleChange = input => event => {
        this.setState({ [input] : event.target.value });
    }

    // needs error handling - implement backend response
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });

        if (this.state.email && this.state.password) {
            this.props.dispatch(login(this.state.email, this.state.password));
        }
    } 

    render() {
        const { email, password, submitted } = this.state;

        return (
            <Card>
            <CardBody>
                <Button tag={Link} to="/register" className="float-right" outline color="info">sign up</Button>
                <h4 class="card-title mb-4 mt-1">sign in</h4>
                {this.props.loggingIn && <Spinner size="sm"/>}
                <Form>
                <FormGroup>
                    <label>email address</label>
                    <input onChange={this.handleChange('email')} name="email" class="form-control" placeholder="john@mail.com" type="email"/>
                    {submitted && !email &&
                            <div className="help-block">Email is required</div>
                    }
                </FormGroup>
                <FormGroup>
                    {/* need forgot? page */}
                    <a class="float-right" href="https://www.youtube.com/watch?v=NPsmkyfyfak">forgot?</a>
                    <label>password</label>
                    <input onChange={this.handleChange('password')} name="password" class="form-control" placeholder="********" type="password"/>
                    {submitted && !password &&
                        <div className="help-block">Password is required</div>
                    }
                </FormGroup>
                <FormGroup>
                    <Button onClick={this.handleSubmit} color="info" className="btn-primary btn-block">submit</Button>
                </FormGroup>
                                                                        
                </Form>
            </CardBody>
            </Card>
        );
    }
}

/*
    This function tells a component how to interpet the redux state (see configStore) into meaningful props that
    can be used for display purposes.
*/

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn,

    };
}

/*
    Basically connects Login to the store.
*/
export default connect (mapStateToProps)(Login);
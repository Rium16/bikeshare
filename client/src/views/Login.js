// adapted from https://bootsnipp.com/user/snippets/3Aq2B
// Jamie Muir
import React, { Component } from 'react';
import { Card, Spinner, CardBody, Button, Form, FormGroup,  } from 'reactstrap';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css'

class Login extends Component {
    
    // needs error handling - implement backend response

    render() {
        
        return (
            <Card>
            <CardBody>
                <Button tag={Link} to="/register" className="float-right" outline color="info">sign up</Button>
                <h4 class="card-title mb-4 mt-1">sign in</h4>
                {this.props.submitted && !this.props.loggedIn &&
                            <div className="help-block help-text">No user exists with this login information.</div>
                    }
                <Form>
                <FormGroup>
                    <label>email address</label>
                    <input onChange={this.props.handleChange('email')} name="email" class="form-control" placeholder="john@mail.com" type="email"/>
                    {this.props.submitted && !this.props.email &&
                            <div className="help-block help-text">email is required</div>
                    }
                </FormGroup>
                <FormGroup>
                    {/* need forgot? page */}
                    <a class="float-right" href="https://www.youtube.com/watch?v=NPsmkyfyfak">forgot?</a>
                    <label>password</label>
							<input onChange={this.props.handleChange('password')} name="password" class="form-control" placeholder="********" type="password"/>
                    {this.props.submitted && !this.props.password &&
                        <div className="help-block help-text">password is required</div>
                    }
                </FormGroup>
                <FormGroup>
                    <Button onClick={this.props.handleSubmit} color="info" className="btn-primary btn-block">submit</Button>
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

/*
    Basically connects Login to the store.
*/
export default Login;
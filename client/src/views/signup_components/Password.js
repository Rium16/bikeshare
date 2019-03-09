// adapted from https://scotch.io/tutorials/creating-multistep-forms-with-react-and-semantic-ui
import React, { Component } from 'react';
import { Container, Form, FormGroup, Button } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css'

class Password extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matching: false,
            submitted: false
        }
    }

    saveAndContinue = (e) => {
        e.preventDefault();
        this.setState({ submitted: true })
        if (this.props.passwordIsValid() && this.props.passwordsMatch()) {
            this.props.nextStep();
        }
        
    }

    goBack = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }
    

    render() {
        return (
            <Container style={this.props.style} className={this.props.className}>
                
                <Form>
                    
                    <h4 class="card-title mb-4 mt-1">password</h4>
                    {!this.props.passwordsMatch() && this.state.submitted &&
                        <div className=""><span className="help-text">Passwords do not match</span></div>
                    }
                    {!this.props.passwordIsValid() && this.state.submitted &&
                        <div className=""><span className="help-text">Password is not valid</span></div>
                    }
                    <FormGroup>
                        <input 
                        onChange={this.props.handleChange('password')} 
                        name="password" 
                        class="form-control" 
                        placeholder="password" 
                        type="password"
                        defaultValue={this.props.values.password}
                        />
                        {!this.props.values.password && this.state.submitted &&
                            <div className="help-block"><span className="help-text">please enter a password</span></div>
                        }
                    </FormGroup>
                    <FormGroup>
                        <input 
                        onChange={this.props.handleChange('confirmPassword')} 
                        class="form-control" 
                        placeholder="confirm password" 
                        type="password"
                        defaultValue={this.props.values.confirmPassword}
                        />
                        {!this.props.values.confirmPassword && this.state.submitted &&
                            <div className="help-block"><span className="help-text">please confirm your password</span></div>
                        }
                    </FormGroup>   
                    <FormGroup>
                        <Button onClick={this.saveAndContinue} color="info" className="float-right">next</Button>
                        <Button onClick={this.goBack} color="secondary" className="float-right">prev</Button>
                    </FormGroup>                                                   
                </Form>
            </Container>
        );
    }
}

export default Password;
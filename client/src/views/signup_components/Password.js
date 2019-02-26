// adapted from https://scotch.io/tutorials/creating-multistep-forms-with-react-and-semantic-ui
import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Button, Form, FormGroup,  } from 'reactstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'

class Password extends Component {

    render() {
        return (
            <CardBody style={this.props.style} className={this.props.className}>
                <h4 class="card-title mb-4 mt-1">password</h4>
                <Form>
                <FormGroup>
                    <input name="" class="form-control" placeholder="password" type="password"/>
                </FormGroup>
                <FormGroup>
                    <input class="form-control" placeholder="confirm password" type="password"/>
                </FormGroup>                                                     
                </Form>
            </CardBody>
        );
    }
}

export default Password;
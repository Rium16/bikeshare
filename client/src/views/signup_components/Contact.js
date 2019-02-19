import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Button, Form, FormGroup,  } from 'reactstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'

class Contact extends Component {

    render() {
        return (
            <CardBody style={this.props.style} className={this.props.className}>
                <h4 class="card-title mb-4 mt-1">contact info</h4>
                <Form>
                <FormGroup>
                    <input name="" class="form-control" placeholder="email" type="email"/>
                </FormGroup>
                <FormGroup>
                    <input class="form-control" placeholder="phone" type="password"/>
                </FormGroup>                                                     
                </Form>
            </CardBody>
        );
    }
}

export default Contact;
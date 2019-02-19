import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Button, Form, FormGroup,  } from 'reactstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'

class Personal extends Component {

    render() {
        return (
            <CardBody style={this.props.style} className={this.props.className}>
                <h4 class="card-title mb-4 mt-1">personal</h4>
                <Form>
                <FormGroup>
                    <input name="" class="form-control" placeholder="first name" pattern="[A-Za-z\s]" type=""/>
                </FormGroup>
                <FormGroup>
                    <input class="form-control" placeholder="last name" type=""/>
                </FormGroup>                                                     
                </Form>
            </CardBody>
        );
    }
}

export default Personal;
// adapted from https://bootsnipp.com/user/snippets/3Aq2B
// Jamie Muir
import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Button, Form, FormGroup,  } from 'reactstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'

class Login extends Component {

    render() {
        return (
            <Card className={this.props.className}>
            <CardBody>
                <Button tag={Link} to="/register" className="float-right" outline color="info">sign up</Button>
                <h4 class="card-title mb-4 mt-1">sign in</h4>
                <Form method="POST">
                <FormGroup>
                    <label>email address</label>
                    <input name="email" class="form-control" placeholder="john@mail.com" type="email"/>
                </FormGroup>
                <FormGroup>
                    <a class="float-right" href="#">forgot?</a>
                    <label>password</label>
                    <input name="password" class="form-control" placeholder="********" type="password"/>
                </FormGroup>
                <FormGroup>
                    <Button color="info" className="btn-primary btn-block">submit</Button>
                </FormGroup>                                                         
                </Form>
            </CardBody>
            </Card>
        );
    }
}

export default Login;
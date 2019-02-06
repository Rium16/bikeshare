import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class Example extends React.Component {
  render() {
    return (
    <div className="signin">
      <h1 className="signinhead">SIGN IN</h1>
      <Form>
        <FormGroup>
          <Label className = "padded" for="exampleEmail">Email: </Label>
          <Input className = "padded" type="email" name="email" id="exampleEmail" placeholder="example@host.com" />
        </FormGroup>
        <FormGroup>
          <Label className = "padded" for="examplePassword">Password: </Label>
          <Input className = "padded" type="password" name="password" id="examplePassword" />
        </FormGroup>
        <Button>Sign In</Button>
      </Form>
    </div>
    );
  }
}


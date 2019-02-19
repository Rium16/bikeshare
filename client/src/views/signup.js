import React, { Component } from 'react';
import Contact from './signup_components/Contact';
import Personal from './signup_components/Personal';

import { Card, FormGroup, Button } from 'reactstrap';

const step = {
    CONTACT: 1,
    NAME: 2,
    PASSWORD: 3,
}

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: step.CONTACT
        }
    }

    next = () => {
        this.setState({
            step: this.state.step + 1
        });
    }

    prev = () => {
        this.setState({
            step: this.state.step - 1
        });
    }

    render() {
        return (
            <Card>
                <Contact style={{display: this.state.step === 1 ? 'block' : 'none'}}/>
                <Personal style={{display: this.state.step === 2 ? 'block' : 'none'}} />
                <FormGroup>
                    <Button onClick={this.next} color="info" className="float-right">next</Button>
                    <Button disabled={this.state.step === step.CONTACT ? true : false} onClick={this.prev} color="secondary" className="float-right">prev</Button>
                </FormGroup>    
            </Card>
        );
    }
}

export default SignUp;
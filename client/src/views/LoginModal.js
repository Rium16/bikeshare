// repurposed example from https://reactstrap.github.io/components/modals/
import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Login from './Login';

class LoginModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: this.props.modal
        };
    
        this.toggle = this.toggle.bind(this);
      }
    
    toggle() {

    }

    onClosed() {

    }

    render() {
        return (
            <Modal centered isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop={true}>
                <Login />
                <ModalFooter>
                    <Button color="secondary" tag={Link} to="/map">close</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default LoginModal;
import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class LogoutModal extends Component {
    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className={this.props.className}>
                <ModalHeader>Confirm logout</ModalHeader>
                <ModalBody>
                    Are you sure you want to log out?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.props.logout}>Logout</Button>{' '}
                    <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default LogoutModal;
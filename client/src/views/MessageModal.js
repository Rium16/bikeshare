// repurposed example from https://reactstrap.github.io/components/modals/
import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

class MessageModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: this.props.modal
        };
    
        this.toggle = this.toggle.bind(this);
      }
    
    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        return (
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop={true}>
                <ModalHeader toggle={this.toggle}>Message</ModalHeader>
                <ModalBody>
                    {this.props.message}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.toggle}>Close</Button>{' '}
                </ModalFooter>
            </Modal>
        );
    }
}

export default MessageModal;
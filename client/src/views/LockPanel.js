// repurposed from examples at https://reactstrap.github.io/components/collapse/
import React, { Component } from 'react';
import { Collapse, CardBody, Card, CardHeader, CardText } from 'reactstrap';


class LockPanel extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
      }
    
      toggle() {
        this.setState({ collapse: !this.state.collapse });
      }
    
      render() {
        return (
            <Card onClick={this.toggle} className="lock-display">
                <CardBody>
                    <CardHeader>Bike locked at {this.props.locationName}!</CardHeader>
                
                    <Collapse isOpen={this.state.collapse}>
                        <CardText>Equipment ID: {this.props.equipmentID}</CardText>
                        <CardText>Equipment type: {this.props.equipmentType}</CardText>
                    </Collapse>
                </CardBody>
            </Card>
        );
      }
}

export default LockPanel;
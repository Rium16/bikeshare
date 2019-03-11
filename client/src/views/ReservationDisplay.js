import React, { Component } from 'react';
import { Card, CardBody, CardText } from 'reactstrap';
import Count from './Count';

class ReservationDisplay extends Component {

    render() {
        return (
            <Card>
                <CardBody>
                    {this.props.equipment && this.props.location ?
                    <CardText>
                        Bike ID: {this.props.equipment.EID}
                        <br />
                        Location: {this.props.location.name}
                        <br />
                        Expires in <Count max={30} current={7}/> mins 
                    </CardText>
                    :
                    <CardText style={{textAlign: 'center'}}>
                        [none]
                    </CardText>
                    }
                </CardBody>
            </Card>
        );
    }
}

export default ReservationDisplay;
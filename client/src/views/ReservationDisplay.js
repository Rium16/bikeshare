import React, { Component } from 'react';
import { Card, CardBody, CardText } from 'reactstrap';
import Count from './Count';

class ReservationDisplay extends Component {

    render() {
        return (
            <Card>
                <CardBody>
                    <CardText>
                        Bike ID: 17
                        <br />
                        Location: Haymarket 
                        <br />
                        Expires in <Count max={30} current={7}/> mins 
                    </CardText>
                </CardBody>
            </Card>
        );
    }
}

export default ReservationDisplay;
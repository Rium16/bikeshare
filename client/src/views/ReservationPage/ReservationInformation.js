import React, { Component } from 'react';
import { Card, Row, Col } from 'reactstrap';

class ReservationInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            equipmentType: null,
            equipmentID: null,
            locationName: null,
            expiresIn: null,
        }
    }

    getReservation() {

    }

    render() {
        return (
            <Card className="reservation-information-container">
            
            </Card>

        )
    }
}
export default ReservationInformation;
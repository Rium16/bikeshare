import React, { Component } from 'react';
import { Card, CardBody, CardText } from 'reactstrap';
import Count from './Count';

class ReservationDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locationName: null,
            equipmentType: null,
            equipmentID: null,
        }
    }

    componentDidMount = () => {
        this.getEquipment();
        this.getLocation();
    }


    getEquipment = async() => {
        const response = await fetch(`/api/location/${this.props.reservation.locationID}`);
        const body = await response.json();
        this.setState({
            locationName: body.response[0].name,
        });
    }

    getLocation = async() => {
        const response = await fetch(`/api/equipment/${this.props.reservation.equipmentID}`);
        const body = await response.json();
        this.setState({
            equipmentType: body.response[0].type,
            equipmentID: body.response[0].EID
        });
    }

    render() {
        

        return (
            <Card>
                <CardBody>
                    {this.props.reservation ?
                    <CardText>
                        Bike ID: <span style={{float: 'right'}}> {this.state.equipmentID}</span>
                        <br />
                        Location: <span style={{float: 'right'}}> {this.state.locationName}</span>
                        <br />
                        Expires in &nbsp;
                        <Count max={30} current={this.props.timeLeft} /> &nbsp;
                        minutes
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
import React, { Component } from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, CardText, Button } from 'reactstrap';
import ReservationInformation from './ReservationInformation';
import SettingsNav from '../settings_components/SettingsNav';

import { loan, unlock } from '../../_actions/userActions';

import { connect } from 'react-redux';
import { history } from '../../services/history';

class ReservationVoucher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locationName: null,
            equipmentType: null,
            equipmentID: null,
        }
    }

    componentDidMount = async() => {
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

    handleClick = () => {
        const { customerID, equipmentID, locationID } = this.props.reservation;
        this.props.dispatch(loan(customerID, equipmentID, locationID));
        this.props.dispatch(unlock(equipmentID));
        history.push('/map');

    }

    render() {
        const ts = this.props.reservation.start.split(/[T\.]/);
        const te = this.props.reservation.end.split(/[T\.]/);
        const t = new Date(this.props.reservation.start);
        console.log(t.toDateString());
        const qr = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${this.props.reservation.customerID}${this.props.reservation.start}`;

        return (
            <div>
            
            <Container className="voucher-container">
                <Row>
                {/* not centered properly idk*/}
                <Col sm="12" md="6" className="offset-md-3">
                    <br />
                    <p style={{textAlign:'center'}}><img src={qr} alt="QR" width="250" height="250"/></p>
                    <div style={{textAlign: 'center'}}><Button onClick={this.handleClick} style={{marginBottom: "10px"}} color="info">Simulate scan</Button></div>
                </Col>
                </Row>

                <Row>
                    <Col sm="12" md="6" className="offset-md-3">
                    <Card>
                        <CardHeader>Reservation</CardHeader>
                        <CardBody>
                            <CardText>
                                <ul style={{listStyleType:"none", marginLeft: "0px", paddingLeft: "0px"}}>
                                    <li>Location: <span style={{float: 'right'}}>{this.state.locationName}</span></li>
                                    <li>Equipment type: <span style={{float: 'right'}}>{this.state.equipmentType}</span></li>
                                    <li>Equipment ID: <span style={{float: 'right'}}>{this.state.equipmentID}</span></li>
                                    <li>Locked at: <span style={{float: 'right'}}>{ts[0]},  {ts[1]}</span></li>
                                    <li>Expires: <span style={{float: 'right'}}>{te[0]}, {te[1]}</span></li>
                                </ul>
                            </CardText>
                        </CardBody>
                    </Card>
                    </Col>
                </Row>

            </Container>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { reservation } = state.reservation;
    return {
        reservation,
    }
}
export default connect (mapStateToProps) (ReservationVoucher);
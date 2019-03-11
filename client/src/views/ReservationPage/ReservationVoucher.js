import React, { Component } from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, CardText } from 'reactstrap';
import ReservationInformation from './ReservationInformation';
import SettingsNav from '../settings_components/SettingsNav';

import { connect } from 'react-redux';

class ReservationVoucher extends Component {

    render() {

        return (
            <div>
            
            <Container className="voucher-container">
                <Row>
                {/* not centered properly idk*/}
                <Col sm="12" md="6" className="offset-md-3">
                    <p style={{textAlign:'center'}}><img src="https://www.webopedia.com/imagesvr_ce/7576/webo-qr.png" alt="QR" width="250" height="250"/></p>
                </Col>
                </Row>

                <Row>
                    <Col sm="12" md="6" className="offset-md-3">
                    <Card>
                        <CardHeader>Reservation</CardHeader>
                        <CardBody>
                            <CardText>
                                <ul style={{listStyleType:"none", marginLeft: "0px", paddingLeft: "0px"}}>
                                    <li>Location: <span style={{float: 'right'}}>{this.props.location.name}</span></li>
                                    <li>Equipment type: <span style={{float: 'right'}}>{this.props.equipment.type}</span></li>
                                    <li>Equipment ID: <span style={{float: 'right'}}>{this.props.equipment.EID}</span></li>
                                    <li>Locked at: <span style={{float: 'right'}}>idk</span></li>
                                    <li>Expires: <span style={{float: 'right'}}>Xmins</span></li>
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
    const { location, equipment } = state.reservation;
    return {
        location,
        equipment
    }
}
export default connect (mapStateToProps) (ReservationVoucher);
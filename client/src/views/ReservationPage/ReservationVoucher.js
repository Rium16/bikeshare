import React, { Component } from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, CardText } from 'reactstrap';
import ReservationInformation from './ReservationInformation';
import SettingsNav from '../settings_components/SettingsNav';


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
                                <p>Location: <span style={{float: 'right'}}>hi</span></p>
                                <p>Equipment type: <span style={{float: 'right'}}>hasdfasdfasdfdasfi</span></p>
                                <p>Equipment ID: <span style={{float: 'right'}}>hi</span></p>
                                <p>Expires: <span style={{float: 'right'}}>hi</span></p>
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

export default ReservationVoucher;
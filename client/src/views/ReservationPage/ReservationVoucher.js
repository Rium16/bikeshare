import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

class ReservationVoucher extends Component {

    render() {

        return (
            <Container className="voucher-container">
                <Row>
                {/* not centered properly idk*/}
                <Col sm="12" md="6" className="offset-md-3">
                    <p style={{textAlign:'center'}}><img src="https://www.webopedia.com/imagesvr_ce/7576/webo-qr.png" alt="Stickman"/></p>
                </Col>
                </Row>

            </Container>
        );
    }
}

export default ReservationVoucher;
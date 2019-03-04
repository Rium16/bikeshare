import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { IoIosContact } from 'react-icons/io';

import ReservationDisplay from './ReservationDisplay';

import { Link } from 'react-router-dom';

class AccountSummary extends Component {

    render() {
        return (
            <Container className="account-container">
                <Row>
                    <Col sm="12" md="6" className="offset-md-3">
                        <p style={{margin:"0px"}} align="center"><Link to="/settings/account"><IoIosContact size="256"/></Link></p>
                        <h1 align="center">Jamie</h1>
                        <br />
                        <p>Current reservation:</p>
                        <ReservationDisplay />
                    </Col>
                </Row>

            </Container>
            
        );
    }
}

export default AccountSummary;
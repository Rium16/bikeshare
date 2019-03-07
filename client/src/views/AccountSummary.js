import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { IoIosContact, IoIosExit } from 'react-icons/io';
import ReservationDisplay from './ReservationDisplay';
import { logout } from '../_actions/userActions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class AccountSummary extends Component {

    handleLogout =() => {
        this.props.dispatch(logout());
    }

    render() {
        const userDetails = JSON.parse(localStorage.getItem('user'));
        return (
            <Container className="account-container">
                <Row>
                    <Col sm="12" md="6" className="offset-md-3">
                        <p style={{margin:"0px"}} align="center"><Link to="/settings/account"><IoIosContact size="256"/></Link></p>
                        <h2 align="center">{userDetails.firstname}<div onClick={this.handleLogout}><Link to="/map"><IoIosExit size="32"/></Link></div></h2>
                        
                        <br />
                        <p>Current reservation:</p>
                        <ReservationDisplay />
                    </Col>
                </Row>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {

    }
}
export default connect(mapStateToProps)(AccountSummary);
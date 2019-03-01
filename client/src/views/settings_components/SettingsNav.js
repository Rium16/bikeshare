import React, { Component } from 'react';
import { Nav, Navbar, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io';

class SettingsNav extends Component {

    render() {
        return (
            <Navbar style={{whiteSpace: 'nowrap'}} className="navbar-expand-lg setting-nav" color="light" light expand="md">

                <Nav style={{whiteSpace: 'nowrap'}} className="mr-auto" navbar>
                    <NavItem className="icon"><Link to="/settings"><IoIosArrowRoundBack size={32}/></Link></NavItem>
                </Nav>
            </Navbar>
        );
    }
}

export default SettingsNav;
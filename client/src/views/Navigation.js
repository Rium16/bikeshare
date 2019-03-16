// repurposed example from:
// https://reactstrap.github.io/components/navbar/

import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IoIosContact, IoIosSettings, IoIosPulse,  } from 'react-icons/io';
import { theme } from '../services/theme';

class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loginData: null,
            loginMessage: null
        }
    }

    render() {
        return (
            <div>
                <Navbar className="nav" style={{backgroundColor: theme(localStorage.getItem('theme')).backgroundColor}} light expand="md">
                    <NavbarBrand><Link to="/map">pyroiscycles</Link></NavbarBrand>

                    <Nav className="ml-auto" navbar>
                        <NavItem>{this.state.loginMessage}</NavItem>
                        <NavItem>
                            {localStorage.getItem('user') ?
                            <Link to="/account"><IoIosContact style={{color: 'green'}} size={32} /></Link>
                           
                            :
                            <Link to="/map/login"><IoIosContact style={{color: 'red'}} size={32} /></Link>
                            }
                            {/* temp link to account */}
                            {localStorage.getItem('user') &&
                            <Link to="/settings"><IoIosSettings size={32} /></Link>
                            }
							<Link to="/staff"><IoIosPulse size={32} /></Link>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}


export default Navigation;
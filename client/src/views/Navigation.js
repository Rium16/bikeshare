// repurposed example from:
// https://reactstrap.github.io/components/navbar/

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IoIosContact } from 'react-icons/io';

class Navigation extends Component {

    state = {
        loginData: [],
        loginMessage: null
    }

    constructor(props) {
        super(props);
    }

    getLoginData = async () => {
        const response = await fetch('/api/checkLogin');
        const body = await response.json();
        var message = "error";
        var data = [];
        if (response.status !== 200) throw Error(body.message);
        else {
            data = body;
        }
        //return message;
        return data;
    }
    
    componentDidMount() {
        fetch('/api/checkLogin')
            .then(res => res.json())
            .then(json =>
                this.setState({
                    loginMessage : json + " test"
                })
            );
    }    

    render() {
        // this can probs be simplified
        if (this.state.loginData === []) {
            return (
                <div>
                    <Navbar color="light" light expand="md">
                        <NavbarBrand><Link to="/map">pyroiscycles</Link></NavbarBrand>

                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Link to="/map/login"><IoIosContact size={32} /></Link>
                            </NavItem>
                        </Nav>

                    </Navbar>
                </div>
            );
        } else {
            return (
                <div>
                    <Navbar color="light" light expand="md">
                        <NavbarBrand><Link to="/map">pyroiscycles</Link></NavbarBrand>

                        <Nav className="ml-auto" navbar>
                            <NavItem>{this.state.loginMessage}</NavItem>
                            <NavItem>
                                <Link className="icon" to="/map/login"><IoIosContact size={32} /></Link>
                            </NavItem>
                        </Nav>

                    </Navbar>
                </div>
            );
        }
    }
}


export default Navigation;
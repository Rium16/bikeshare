// repurposed example from:
// https://reactstrap.github.io/components/navbar/

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IoIosContact, IoIosSettings } from 'react-icons/io';

class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loginData: null,
            loginMessage: null
        }
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

        return (
            <div>
                <Navbar className="nav" color="light" light expand="md">
                    <NavbarBrand><Link to="/map">pyroiscycles</Link></NavbarBrand>

                    <Nav className="ml-auto" navbar>
                        <NavItem>{this.state.loginMessage}</NavItem>
                        <NavItem>
                            {this.state.loginData ?
                            <Link to="/account"><IoIosSettings size={32} /></Link>
                            :
                            <Link to="/map/login"><IoIosContact size={32} /></Link>
                            }
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}


export default Navigation;
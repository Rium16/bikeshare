// repurposed example from:
// https://reactstrap.github.io/components/navbar/

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IoIosContact } from 'react-icons/io';

class Navigation extends Component {

    state = {
        loginMessage : null
    }

    constructor(props) {
        super(props);
    }

    getLoginMessage = async () => {
        const response = await fetch('/api/checkLogin');
        const body = await response.json();
        var message = "";
        if (response.status !== 200) throw Error(body.message);
        else {
            if (response !== "false") {
                message = "Logged in as " + response.body;
            }
        }
        this.setState({
            loginMessage : message
        });
    }

    componentDidMount() {
        this._asyncRequest = this.getLoginMessage().then(
            loginMessage => {
                this._asyncRequest = null;
                this.setState({ loginMessage });
            }
        );
    }

    componentWillUnmount() {
        if (this._asyncRequest) {
            this._asyncRequest.cancel();
        }
    }

    render() {
        if (this.state.loginMessage === null) {
            return (
                <div>
                    <Navbar color="light" light expand="md">
                        <NavbarBrand><Link to="/">Bikes 'n' Dykes</Link></NavbarBrand>

                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Link to="/login"><IoIosContact size={32} />Sign In</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/register"><IoIosContact size={32} />Sign Up</Link>
                            </NavItem>
                        </Nav>

                    </Navbar>
                </div>
            );
        } else {
            return (
                <div>
                    <Navbar color="light" light expand="md">
                        <NavbarBrand><Link to="/">PyroiCyles</Link></NavbarBrand>

                        <Nav className="ml-auto" navbar>
                            <NavItem>{this.state.loginMessage}</NavItem>
                            <NavItem>
                                <Link to="/login"><IoIosContact size={32} />Sign In</Link>
                            </NavItem>
                        </Nav>

                    </Navbar>
                </div>
            );
        }
    }
}


export default Navigation;
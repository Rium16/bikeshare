// repurposed example from:
// https://reactstrap.github.io/components/navbar/

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IoIosContact } from 'react-icons/io';

class Navigation extends Component {

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <div>
              <Navbar color="light" light expand="md">
                <NavbarBrand><Link to="/">Bikes 'n' Dykes</Link></NavbarBrand>

                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      <Link to="/login"><IoIosContact size={32}/></Link>
                    </NavItem>
                  </Nav>

              </Navbar>
            </div>
          );
    }
}


export default Navigation;
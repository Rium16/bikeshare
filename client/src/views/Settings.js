import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';

class Settings extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="h-100 settings">
            <ListGroup >
                <Link to="/settings/account" style={{textDecoration: 'none'}} className="first-settings-item"><ListGroupItem>account</ListGroupItem></Link>
                <Link to="/settings/billing" style={{textDecoration: 'none'}}><ListGroupItem>billing</ListGroupItem></Link>
                <Link to="/settings/display" style={{textDecoration: 'none'}}><ListGroupItem>display</ListGroupItem></Link>
                <Badge color="info" style={{textAlign: 'left'}}>my bikeshare</Badge>
                <Link to="/settings/favourites" style={{textDecoration: 'none'}}><ListGroupItem>favourites</ListGroupItem></Link>
                <Link to="/settings/home-network" style={{textDecoration: 'none'}}><ListGroupItem>default bike network</ListGroupItem></Link>
                <Badge color="info" style={{textAlign: 'left'}}>support</Badge>
                <Link to="/settings/about" style={{textDecoration: 'none'}}><ListGroupItem>about</ListGroupItem></Link>
                <Link to="/settings/feedback" style={{textDecoration: 'none'}}><ListGroupItem>talk to us!</ListGroupItem></Link>
                <Link to="/settings/FAQ" style={{textDecoration: 'none'}}><ListGroupItem>FAQ</ListGroupItem></Link>
            </ListGroup>
            </div>
        );
    }
}

export default Settings;
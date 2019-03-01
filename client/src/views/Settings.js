import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { AccountPage, BillingPage, DisplayPage, AboutPage, FAQPage } from './settings_components/SettingsComponents';


class Settings extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="h-100 settings">
            <Router>
                <div>
                <Route path="/settings/account" component={AccountPage} />
                <Route path="/settings/billing" component={BillingPage} />
                <Route path="/settings/display" component={DisplayPage} />
                <Route path="/settings/about" component={AboutPage} />
                <Route path="/settings/faq" component={FAQPage} />

                <ListGroup >
                    <Link to="/settings/account" style={{textDecoration: 'none'}} className="first-settings-item"><ListGroupItem>account</ListGroupItem></Link>
                    <Link to="/settings/billing" style={{textDecoration: 'none'}}><ListGroupItem>billing</ListGroupItem></Link>
                    <Link to="/settings/display" style={{textDecoration: 'none'}}><ListGroupItem>display</ListGroupItem></Link>
                    <Badge style={{textAlign: 'left'}} color="info">Info</Badge>
                    <Link to="/settings/about" style={{textDecoration: 'none'}}><ListGroupItem>about</ListGroupItem></Link>
                    <Link to="/settings/FAQ" style={{textDecoration: 'none'}}><ListGroupItem>FAQ</ListGroupItem></Link>
                </ListGroup>
                
                </div>
            </Router>
            </div>
        );
    }
}

export default Settings;
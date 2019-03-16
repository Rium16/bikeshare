import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class SearchLocationsList extends Component {

    render() {
        return (
            <ListGroup className="search-locations">
                <ListGroupItem><b>Nearby docks</b></ListGroupItem>
                <ListGroupItem>Haymarket</ListGroupItem>
                <ListGroupItem>Silverknowes</ListGroupItem>
                <ListGroupItem>Easter Road</ListGroupItem>
                <ListGroupItem>Heriot Watt</ListGroupItem>
            </ListGroup>
        );
    }
} 
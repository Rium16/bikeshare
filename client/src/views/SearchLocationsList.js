import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';
import Count from './Count';

export default class SearchLocationsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locs: []
        }
    }

    componentDidMount = async() => {
        const response = await fetch('/api/location');
        const body = await response.json();
        var locs = []
        body.map(function(x) {
            var loc = {
                latitude: x.latitude,
                longitude: x.longitude,
                name: x.name,
                numFreeBikes: x.numFreeBikes,
                bikeCapacity: x.bikeCapacity,
            }
            console.log(loc);
            locs.push(loc);
        });
        this.setState({
            locs: locs
        });
        
        console.log(this.state.locs);

    }

    render() {
        const locs = this.state.locs;
        const setViewport = this.props.setViewport;
        const style = this.props.style;

        return (
            <ListGroup className="search-locations-list">
                <ListGroupItem style={{backgroundColor: style.backgroundColor, color: style.color}}><b>Nearby docks</b></ListGroupItem>
                {locs.map(function(loc) {
                    const viewport = {
                        center: [loc.latitude, loc.longitude],
                        zoom: 14
                    }
                    return (
                        <ListGroupItem style={{backgroundColor: style.backgroundColor, color: style.color}} className="search-location" onClick={() => setViewport(viewport)}>
                        {loc.name} &nbsp;
                        <Count style={{float: 'right'}} max={loc.bikeCapacity} current={loc.numFreeBikes} />
                        </ListGroupItem>
                    );
                })}
                
            </ListGroup>
        );
    }
} 
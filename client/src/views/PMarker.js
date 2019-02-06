import React, { Component } from 'react';
import { Marker, Popup } from 'react-leaflet';
import Count from './Count';
import L from 'leaflet';

const myIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -42]
  });

class PMarker extends Component {

    render() {
        return (
            <Marker 
            position={this.props.position} 
            icon={myIcon}>
                <Popup
                onOpen={this.props.onOpen}
                onClose={this.props.onClose}
                closeButton={false}
                >
                <p className="location-name">{this.props.name}</p>
                <Count max={this.props.bikeCapacity} current={this.props.numFreeBikes} className="count">{this.props.numFreeBikes}</Count> bikes <br />
                <Count max={this.props.bikeCapacity} current={this.props.bikeCapacity - this.props.numBikes} className="count">{this.props.bikeCapacity - this.props.numBikes}</Count> docks
                </Popup>
            </Marker>
        )
    }
}

export default PMarker;
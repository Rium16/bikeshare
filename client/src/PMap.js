import React, { Component } from 'react';
import { Map, TileLayer, Viewport,  Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Router, Route } from 'react-router-dom';


const DEFAULT_VIEWPORT = {
    center: [55.943, -3.188],
    zoom: 14
}

const myIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -42]
  });

class PMap extends Component {
    state = {
        locations: [],
        viewport: DEFAULT_VIEWPORT
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(position);
          var v = {
              center: [position.coords.latitude, position.coords.longitude],
              zoom: 14
          }
          this.setState({ viewport: v });
        }, () => {
          console.log("Location request denied.");
          fetch('https://ipapi.co/json')
            .then(res => res.json())
            .then(location => {
              console.log(location);
              this.setState({
                viewport: {
                    center: [location.latitude, location.longitude],
                    zoom: 14
                }
              })
            })
        });
        
        this.getDockingStations();
    }

    getDockingStations = async () => {
        const response = await fetch('/api/location');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        else {
          this.setState({ locations: body });
          return body;
        }
      }

    render() {

        return (
            <div className="map-container">
            <Map
                zoomControl={false}
                className={this.props.className}
                viewport={this.state.viewport}
                onViewportChanged={this.onViewportChanged}
            >
            <TileLayer
                attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
            />
            {this.state.locations.map(function(location) {
            var position = [location.latitude, location.longitude];
            return (
                <Marker position={position} icon={myIcon}>
                    <Popup>
                    {location.name} <br /> 
                    Bike capacity: {location.bikeCapacity} <br />
                    Locker count: {location.lockerCapacity}
                    </Popup>
                </Marker>
                );
            })}

            
            </Map>
            </div>
        
        )
    }
}

export default PMap;
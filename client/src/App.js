import React, { Component } from 'react';
import './App.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import L from 'leaflet';

const myIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -42]
});

class App extends Component {
  state = {
    response: "empty",
    lat: 55.953,
    lng: -3.188,
    zoom: 13,
    locations: []
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      this.setState({ 
        lat: position.coords.latitude,
        lng: position.coords.longitude, 
        zoom: 14,
        haveUsersLocation: true
      });
    }, () => {
      console.log("Location request denied.");
      fetch('https://ipapi.co/json')
        .then(res => res.json())
        .then(location => {
          console.log(location);
          this.setState({
            lat: location.latitude,
            lng: location.longitude,
            zoom: 14,
            haveUsersLocation: true
          })
        })
    });

    this.getLocations();
  }

  getLocations = async () => {
    const response = await fetch('/api/location');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    else {
      this.setState({ locations: body });
      return body;
    }
  }

  // an example function, as it is not very useful
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();

    this.setState({ responseToPost: body });
  };

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <div className="App">
        <Map className="map" center={position} zoom={this.state.zoom}>
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
        <Marker position={position}>
          
        </Marker>
      </Map>
      <Card className="sample">
        <CardBody>
          
        </CardBody>
      </Card>
      </div>
    );
  }
}

export default App;


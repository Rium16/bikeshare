import React, { Component } from 'react';
import './App.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

class App extends Component {
  state = {
    response: "empty",
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
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

    this.callApi()
      .then(res => this.setState({ response: res.example }))
      .catch(err => this.setState({ response: err.message}));
  }

  callApi = async () => {
    const response = await fetch('/api/location');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
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
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
      <Card className="sample">
        <CardBody>
          <CardTitle>Estimated user coordinates</CardTitle>
          <CardText>Latitude: {this.state.lat}</CardText>
          <CardText>Longitude: {this.state.lng}</CardText>
          <CardText>example API call gives this: {this.state.response.lat}</CardText>
        </CardBody>
      </Card>
      </div>
    );
  }
}

export default App;


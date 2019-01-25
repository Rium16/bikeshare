import React, { Component } from 'react';
import './App.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

class App extends Component {
  state = {
    response: "empty",
    post: '',
    responseToPost: 'dsf',
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
  };

  componentDidMount() {
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
          <CardTitle>EXAMPLE GET</CardTitle>
          <CardText>{this.state.response.lng}</CardText>
        </CardBody>
      </Card>
      </div>
    );
  }
}

export default App;

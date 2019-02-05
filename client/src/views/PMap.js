import React, { Component } from 'react';
import { Map, TileLayer, Viewport,  Marker, Popup } from 'react-leaflet';
import PMarker from './PMarker';
import { Button, Card, CardBody, CardText, CardHeader } from 'reactstrap';
import { IoIosLock, IoIosKey } from 'react-icons/io';

// defaults to edinburgh (for now)
const DEFAULT_VIEWPORT = {
    center: [55.943, -3.188],
    zoom: 14
}

class PMap extends React.Component {

    // state information:
    //  -list of locations
    //  -user's location viewport (not implemented)
    //  -which location is being viewed (popup is open or not)
    //  -locked location
    state = {
        docks: [],
        viewport: DEFAULT_VIEWPORT,
        viewing: null,
        lockDetails: null
    }

    constructor(props) {
        super(props);
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
            var locs = [];
            body.map(function(x) {
                var loc = {
                    LID: x.LID,
                    latitude: x.latitude,
                    longitude: x.longitude,
                    name: x.name,
                    numBikes: x.numBikes,
                    numFreeBikes: x.numFreeBikes,
                    bikeCapacity: x.bikeCapacity,
                    helmetCapacity: x.helmetCapcity
                }
                locs.push(loc);
            })
            this.setState({ docks: locs });
            return body;
        }
      }

    openLocation = (location) => {
        this.setState({ viewing: location  });
    }

    closeLocation = () => {
        this.setState({ viewing: false });
    }

    lock = async (viewing) => {
        const response = await fetch('/api/lock', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ locationID: viewing.LID }),
          });
        var body = await response.json();
        if (body.reservedItem) {
            this.setState({ lockDetails: {
                location: viewing,
                equipment: body.reservedItem
            }});
            this.getDockingStations();
        } else {
            alert(body.message);
        }
        
    }

    unlock = async () => {
        const response = await fetch('/api/unlock', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ equipmentID: this.state.lockDetails.equipment.EID })
        });

        this.getDockingStations();
        this.setState({ lockDetails: null });
        alert("Bike successfully unlocked.");
    }

    render() {
        // reference to the instantiated PMap component, helpful for 
        // nested functions, can't tell if this is hacky or not
        const _this = this;
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
            {this.state.docks.map(function(location) {
            var position = [location.latitude, location.longitude];
            return (
                <PMarker
                {...location}
                position={position}
                onOpen={() => _this.openLocation(location)}
                onClose={_this.closeLocation}
                >
                </PMarker>
                );
            })}
            </Map>
            {this.state.lockDetails ?
            <Button color="info" onClick={() => this.unlock()}  className='locker'><IoIosKey size="1.5em"/></Button>
            :
            <Button color="info" disabled={!this.state.viewing} onClick={() => this.lock(this.state.viewing)} className='locker'><IoIosLock size="1.5em"/></Button>
            }

            {this.state.lockDetails ?
            <Card className="lock-display">
                <CardBody>
                    <CardHeader>Bike locked at {this.state.lockDetails.location.name}!</CardHeader>
                    <CardText>Equipment type: {this.state.lockDetails.equipment.type}, 
                    Equipment ID: {this.state.lockDetails.equipment.EID}
                    </CardText>
                </CardBody>
            </Card>
            : "" }
            </div>
        )
    }
}

export default PMap;
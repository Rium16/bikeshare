import React, { Component } from 'react';
import { Map, TileLayer, Viewport,  Marker, Popup } from 'react-leaflet';
import LoanScreen from './LoanScreen';
import PMarker from './PMarker';
import { Button } from 'reactstrap';
import { IoIosLock } from 'react-icons/io';

// defaults to edinburgh (for now)
const DEFAULT_VIEWPORT = {
    center: [55.943, -3.188],
    zoom: 14
}

class PMap extends React.Component {

    // state information:
    //  -list of locations
    //  -user location viewport (not implemented)
    //  -whether or not a dock is being viewed (popup is open or not)
    state = {
        locations: [],
        viewport: DEFAULT_VIEWPORT,
        viewing: false,
        viewingLoan: false
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
                    latitude: x.latitude,
                    longitude: x.longitude,
                    name: x.name,
                    numBikes: x.NumBikes,
                    numLockers: x.NumHelmets,
                    bikeCapacity: x.bikeCapacity,
                    helmetCapacity: x.helmetCapcity
                }
                locs.push(loc);
            })
            this.setState({ locations: locs });
            return body;
        }
      }

    openLocation = () => {
        this.setState({ viewing: true });
    }

    closeLocation = () => {
        this.setState({ viewing: false, viewingLoan: false });
    }

    toggleBorrow = () => {
        this.setState({ viewingLoan: !this.state.viewingLoan});
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
            {this.state.locations.map(function(location) {
            var position = [location.latitude, location.longitude];
            return (
                <PMarker
                position={position}
                locationName={location.name}
                bikeCapacity={location.bikeCapacity}
                numBikes={location.numBikes}
                onOpen={_this.openLocation}
                onClose={_this.closeLocation}
                >
                </PMarker>
                );
            })}
            </Map>
            <Button color="info" disabled={!this.state.viewing}  className='locker'><IoIosLock size="1.5em"/></Button>
            <Button color="info" disabled={!this.state.viewing} className='borrow' onClick={this.toggleBorrow}>B</Button>
            
            {/* bad logic - should only be enabled when locked */}
            {this.state.viewingLoan ? <LoanScreen className="sample"/> : ""}
            </div>
        
        )
    }
}

export default PMap;
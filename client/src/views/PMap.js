import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import PMarker from './PMarker';
import MessageModal from './MessageModal';
import LockPanel from './LockPanel';
import { Button, Col } from 'reactstrap';
import { IoIosLock, IoIosKey, IoIosBicycle } from 'react-icons/io';

import { connect } from 'react-redux';
import { lock, unlock, getReservations } from '../_actions/userActions';
import { userService } from '../services/userService';

import { history } from '../services/history';

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
    constructor(props) {
        super(props);
        this.state = {
            docks: [],
            viewport: DEFAULT_VIEWPORT,
            viewing: null,
            lockDetails: null,
            messageDetails: null,
        }
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

        // try and get an existing customer reservation (if one exists)
        if (localStorage.getItem('user')) {
            this.props.dispatch(getReservations(JSON.parse(localStorage.getItem('user')).CID));
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.alert !== prevProps.alert) {
            this.setState({
                messageDetails: this.props.alert
            });
        }
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

    viewReservation = () => {
        history.push('/voucher')
    }

    lock = async (viewing) => {
        await this.props.dispatch(lock(viewing, JSON.parse(localStorage.getItem('user'))));
        this.setState({
            messageDetails: {
                message: "Equipment locked successfully!"
            }
        })
        this.getDockingStations();
    }

    unlock = async () => {
        // for now just 0th reservation
        await this.props.dispatch(unlock(this.props.reservation.equipmentID));
        this.setState({
            messageDetails: {
                message: "Equipment unlocked successfully!"
            }
        })
        this.getDockingStations();
    }

    test = () => {
        alert("disabled");
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
                <PMarker                {...location} // what is this
                position={position}
                onOpen={() => _this.openLocation(location)}
                onClose={_this.closeLocation}
                >
                </PMarker>
                );
            })}
            </Map>

            <Button 
            className="reservation-button" 
            disabled={!this.props.locked}
            onClick={this.viewReservation}
            ><IoIosBicycle size="24"/></Button>
                       
            <div class="wrapper">
            {this.props.locked ?
            <Button color="info" onClick={() => this.unlock()}  className="locker">{<IoIosKey size="1.5em"/>}</Button>
            : // can only lock if logged in and viewing a depot
            <Button color="info" disabled={!(this.state.viewing && localStorage.getItem('user'))} onClick={() => this.lock(this.state.viewing)} className="locker"><IoIosLock size="1.5em"/></Button>
            }
            </div>

            {this.props.messageDetails ?
            <MessageModal className="message-modal" message="hi" modal={true} />
            :
            ""}


            </div>
        )
    }
}

function mapStateToProps(state) {
    const { reservation, locked } = state.reservation;
    console.log("here");

    return {
        locked,
        reservation,
    }
}

export default connect (mapStateToProps) (PMap);
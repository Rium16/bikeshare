import React, { Component } from 'react';
import { Table, Card, CardBody, CardText, CardTitle, Row, Col, Spinner, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Sidebar from 'react-sidebar';
import { Link, Redirect } from 'react-router-dom';
import { Chart } from 'react-charts';

const mql = window.matchMedia(`(min-width: 10px)`);
const sidebarStyle = { background: "white", paddingTop: 55, width: 200 };
const sp = <Spinner color="primary" />;


class Staff extends Component {

	constructor(props) {
		super(props);
		this.state = {
			sidebarOpen: mql.matches,
			sidebarDocked: true,
			card1:
				<Card body className="table-scroll">
					<CardTitle><b>Rentals - All Time</b></CardTitle>
					{sp}
				</Card>,
			card2:
				<Card body className="table-scroll">
					<CardTitle><b>Rentals - Today</b></CardTitle>
					{sp}
				</Card>,
			card3:
				<Card body className="table-scroll">
					<CardTitle><b>Overview of Locations</b></CardTitle>
					{sp}
				</Card>,
			card4:
				<Card body className="table-scroll">
					<CardTitle><b>Add a Location</b></CardTitle>
					{sp}
				</Card>,
			card5:
				<Card body className="table-scroll">
					<CardTitle><b>Popular Locations - All Time</b></CardTitle>
					{sp}
				</Card>,
			card6:
				<Card body className="table-scroll">
					<CardTitle><b>Popular Locations - 24h</b></CardTitle>
					{sp}
				</Card>,

		};
		this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
		this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
		this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
	}

	componentWillMount() {
		mql.addListener(this.mediaQueryChanged);
		this.plotBikeRentals(1, new Date(2019, 0, 1), "Rentals - All Time");
		this.plotBikeRentals(2, new Date(Date.now()), "Rentals - Today");
		this.Card3();
		this.popularLocations(5, new Date(2019, 0, 1), "Popular Locations - All Time");
		this.popularLocations(6, new Date(Date.now()), "Popular Locations - Today");
		this.addLocation();
		this.removeLocation("");
		//this.removeLocation("test");
	}

	componentWillUnmount() {
		mql.removeListener(this.mediaQueryChanged);
	}

	onSetSidebarOpen(open) {
		this.setState({ sidebarOpen: open });
	}

	mediaQueryChanged() {
		this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
	}

	leftSidebar() {
		return (
			<Sidebar
				sidebar={
					<div>
						<div className="sidebar-contents">
							<Link to="/map">Map</Link>
						</div>
						<div className="sidebar-contents">
							<Link to="">Company Website</Link>
						</div>
					</div>

				}
				defaultSidebarWidth={1}
				open={this.state.sidebarOpen}
				docked={this.state.sidebarDocked}
				styles={{
					sidebar: sidebarStyle
				}}
			></Sidebar>
		)
	}

	rightSidebar() {
		return (
			<Sidebar
				sidebar={
					<div></div>
					/*<div>
						<div className="sidebar-contents">
							Big Chunguska
							</div>
						<div className="sidebar-contents">
							Same on this side
							</div>
						<div className="sidebar-contents">
							More stuff
							</div>
						<div className="sidebar-contents">
							etc.
							</div>
					</div>*/
				}
				defaultSidebarWidth={1}
				open={this.state.sidebarOpen}
				docked={this.state.sidebarDocked}
				pullRight={true}
				styles={{
					sidebar: sidebarStyle
				}}
			></Sidebar>
		)
	}

	addLocation() {
		var formData = {
			name: 'test',
			activeDock: 1,
			bikeCapacity: 20,
			lockerCapacity: 20,
			latitude: 0,
			longitude: 0
		}
		this.setState({
			card4:
				<Card body className="table-scroll" >
					<CardTitle><b>Add a Location</b></CardTitle>
					<Form>
						<FormGroup>
							<Label>Location name</Label>
							<Input type="text" name="name" id="name" />
						</FormGroup>
						<FormGroup>
							<Label>Active Dock</Label>
							<Input type="number" name="activeDock" id="activeDock" />
						</FormGroup>
						<FormGroup>
							<Label>Bike Capacity</Label>
							<Input type="number" name="bikeCapacity" id="bikeCapacity" />
						</FormGroup>
						<FormGroup>
							<Label>Locker Capacity</Label>
							<Input type="number" name="lockerCapacity" id="lockerCapacity" />
						</FormGroup>
						<FormGroup>
							<Label>Latitude</Label>
							<Input type="number" name="latitude" id="latitude" />
						</FormGroup>
						<FormGroup>
							<Label>Longitude</Label>
							<Input type="number" name="longitude" id="longitude" />
						</FormGroup>
						<Button onClick="{this.onSubmit()}">Add Location</Button>
					</Form>
				</Card>
		})
	}

	onSubmit = async () => {
		this.setState({
			card4:
				<Card body className="table-scroll">
					<CardTitle><b>Add a LocationTest</b></CardTitle>
				</Card>
		})
		var formData = {
			name: document.getElementById('name'),
			activeDock: document.getElementById('activeDock'),
			bikeCapacity: document.getElementById('bikeCapacity'),
			lockerCapacity: document.getElementById('lockerCapacity'),
			latitude: document.getElementById('latitude'),
			longitude: document.getElementById('longitude'),
		}
		const response = await fetch(`/api/addLocation`, {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: formData.name,
				activeDock: formData.activeDock,
				bikeCapacity: formData.bikeCapacity,
				lockerCapacity: formData.lockerCapacity,
				latitude: formData.latitude,
				longitude: formData.longitude
			})
		});
		const body = await response.json();
		if (response.status != 200) throw Error(body.message);
		else {
			//this.removeLocation('test');
			/*this.setState({
				card4:
					<Card body className="table-scroll">
						<CardTitle><b>Add a LocationTest</b></CardTitle>
					</Card>
			})*/
		}
	}

	removeLocation = async (name) => {
		const response = await fetch(`/api/removeLocation`, {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: name
			})
		});
	}

	//table of locations in order of popularity
	popularLocations = async (cardPosition, startFrom, message) => {
		const response = await fetch(`/api/pastLoans?startFrom=${startFrom.getTime()}`, {
			method: "GET",
		});
		const body = await response.json();
		if (response.status != 200) throw Error(body.message);
		else {
			var rentals = body.rentals;
			var locs = {};
			for (var rental in rentals) {
				var loc = rentals[rental].location;
				if (!locs[loc]) {
					locs[loc] = 0
				}
				++locs[loc];
			}

			var sorted = [];
			for (var loc in locs) {
				sorted.push({
					name: loc,
					nbRes: locs[loc]
				})
			}
			sorted.sort(function (a, b) {
				return b.nbRes - a.nbRes;
			})
			var jsx =
				<Card body className="table-scroll">
					<CardTitle><b>{message}</b></CardTitle>
					<Table size="sm">
						<thead>
							<th>Location</th>
							<th>Hires</th>
						</thead>
						<tbody>
							{sorted.map(loc => (<tr><td>{loc.name}</td><td>{loc.nbRes}</td></tr>))}
						</tbody>
					</Table>
				</Card>
			;

			if (cardPosition == 4) {
				this.setState({
					card4: jsx
				})
			} else if (cardPosition == 5) {
				this.setState({
					card5: jsx
				})
			} else if (cardPosition == 6) {
				this.setState({
					card6: jsx
				})
			}
		}
	}

	//generates a graph of all bike rentals since a specified date "startFrom"
	plotBikeRentals = async (cardPosition, startFrom, message) => {
		const response = await fetch(`/api/pastLoans?startFrom=${startFrom.getTime()}`, {
			method: "GET",
		});
		const body = await response.json();
		if (response.status != 200) throw Error(body.message);
		else {
			var rentals = body.rentals;
			var data = [];
			var dates = [];
			for (var rental in rentals) {
				if (rentals.hasOwnProperty(rental)) {
					var date = new Date(rentals[rental].start).getTime();
					dates.push(date);
				}
			}
			dates.sort();
			var total = 0;
			var weightedDates = {}
			for (var i = 0; i < dates.length; i++) {
				if (!weightedDates[dates[i]]) {
					weightedDates[dates[i]] = 0;
				}
				++weightedDates[dates[i]];
			}
			for (var date in weightedDates) {
				total += weightedDates[date];
				data.push([date, total]);
			}
			var myData = [
				{
					label: "Bikes rented during X period",
					data: data
				}
			];
			const lineChart = (
				<div
					style={{
						width: "100%",
						height: "100%"
					}}
				>
					<Chart
						data={myData}
						axes={[
							{ primary: true, type: "linear", position: "bottom" },
							{ type: "linear", position: "left" }
						]}
					/>
				</div>
			);
			var startMessage = "";
			if (isNaN(dates[0])) {
				startMessage = "(No Rentals)";
			} else {
				startMessage = "(Starting " + new Date(dates[0]).toString() + ")";
			}
			var component =
				<Card body className="table-scroll">
					<CardTitle><b>{message} {startMessage}</b></CardTitle>
				{lineChart}
			</Card>

			if (cardPosition == 1) {
				this.setState({
					card1: component
				});
			}
			else if (cardPosition == 2) {
				this.setState({
					card2: component
				});
			}
			else if (cardPosition == 3) {
				this.setState({
					card3: component
				});
			}
			else if (cardPosition == 4) {
				this.setState({
					card4: component
				});
			}
		}
	}

	makeBikeTable = (locs) => {
		return (
			<Table size="sm">
				<thead>
					<th>Location</th>
					<th>Total Docks</th>
					<th>Available Bikes</th>
				</thead>
				<tbody>
					{locs.map(loc => (<tr><td>{loc.name}</td> <td>{loc.numBikes}</td> <td>{loc.numFreeBikes}</td></tr>))}
				</tbody>
			</Table>
	)
}

	Card3 = async () => {
		const response = await fetch('/api/location');
		const body = await response.json();
		if (response.status != 200) throw Error(body.message);
		else {
			var locs = [];
			body.map(function (x) {
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

			this.setState({
				card3:
					<Card body className="table-scroll">
						<CardTitle><b>Location Bike Count</b></CardTitle>
						{this.makeBikeTable(locs)}
					</Card>
			})
		}
	}
						
	render() {
		return (
			<div>
				{this.leftSidebar()}
				{this.rightSidebar()}

				<div className="staff-center-page">
					<Row>
						<Col sm="6">
							{this.state.card1}
						</Col>
						<Col sm="6">
							{this.state.card2}
						</Col>
					</Row>
				</div>
				<div className="staff-center-page">
					<Row className="card-row-height">
						<Col sm="6">
							{this.state.card3}
						</Col>
						<Col sm="6">
							{this.state.card4}
						</Col>
					</Row>
				</div>
				<div className="staff-center-page">
					<Row className="card-row-height">
						<Col sm="6">
							{this.state.card5}
						</Col>
						<Col sm="6">
							{this.state.card6}
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}

export default Staff;
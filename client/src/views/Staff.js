import React, { Component } from 'react';
import { Table, Card, CardBody, CardText, CardTitle, Row, Col, Spinner } from 'reactstrap';
import Sidebar from 'react-sidebar';
import { Link } from 'react-router-dom';
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
			card2: sp,
			card3: sp,
			data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]

		};
		this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
		this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
		this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
	}

	componentWillMount() {
		mql.addListener(this.mediaQueryChanged);
		this.plotBikeRentals(1, new Date(2019, 1, 1))
		//this.Card2();
		this.Card3();
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
							Links and options
							</div>
						<div className="sidebar-contents">
							More options
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
					<div>
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
					</div>
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

	//generates a graph of all bike rentals since a specified date "startFrom"
	plotBikeRentals = async (cardPosition, startFrom) => {
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
			//return lineChart;
			var component =
			<Card body className="table-scroll">
				<CardTitle><b>Rentals - All Time (Starting {new Date(dates[0]).toString()}</b></CardTitle>
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
		


	Card2 = async () => {
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
				card2:
					<Table size="sm">
						<thead>
							<td>Location name</td>
							<td>Number of bikes</td>
							<td>Number of free bikes</td>
						</thead>
						<tbody>
							<tr>
								<td>{locs[0].name}</td>
								<td>{locs[0].numBikes}</td>
								<td>{locs[0].numFreeBikes}</td>
							</tr>
							<tr>
								<td>{locs[1].name}</td>
								<td>{locs[1].numBikes}</td>
								<td>{locs[1].numFreeBikes}</td>
							</tr>
							<tr>
								<td>{locs[2].name}</td>
								<td>{locs[2].numBikes}</td>
								<td>{locs[2].numFreeBikes}</td>
							</tr>
						</tbody>
					</Table>
			});
		}
	}

	func = (locs) => {
		return (
			<Table size="sm">
				<thead>
					<th>Location</th>
					<th>Total bikes</th>
					<th>Available</th>
				</thead>
				<tbody>
					{locs.map(loc => (<tr><td>{loc.name}</td> <td>{loc.numBikes}</td> <td>{loc.numFreeBikes}</td></tr>))}
				</tbody>
			</Table>
	)
}

	Card3 = async() => {
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
				card3: this.func(locs)
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
							<Card body className="table-scroll">
								<CardTitle>Some other graph/figure</CardTitle>
								{this.state.card2}
							</Card>
						</Col>
					</Row>
				</div>
				<div className="staff-center-page">
					<Row className="card-row-height">
						<Col sm="6">
							<Card body className="table-scroll">
								<CardTitle><b>Bikes & Locations</b></CardTitle>
								{this.state.card3}
							</Card>
						</Col>
						<Col sm="6">
							<Card body className="table-scroll">
								<CardTitle>Some other graph/figure</CardTitle>
								<Spinner color="primary" />
							</Card>
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}

export default Staff;
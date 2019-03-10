import React, { Component } from 'react';
import { Table, Card, CardBody, CardText, CardTitle, Row, Col, Spinner } from 'reactstrap';
import Sidebar from 'react-sidebar';
import { Link } from 'react-router-dom';

const mql = window.matchMedia(`(min-width: 10px)`);
const sidebarStyle = { background: "white", paddingTop: 55, width: 200 };
const sp = <Spinner color="primary" />;


class Staff extends Component {

	constructor(props) {
		super(props);
		this.state = {
			sidebarOpen: mql.matches,
			sidebarDocked: true,
			card1: sp,
			card2: sp,
			card3: sp
		};
		this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
		this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
		this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
	}

	componentWillMount() {
		mql.addListener(this.mediaQueryChanged);
		//this.Card1();
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

	Card1 = async() => {
		this.setState({
			card1:
				<Table size="sm">
					<thead>
						<tr>
							<th>#</th>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Username</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th scope="row">1</th>
							<td>Mark</td>
							<td>Otto</td>
							<td>@mdo</td>
						</tr>
						<tr>
							<th scope="row">2</th>
							<td>Jacob</td>
							<td>Thornton</td>
							<td>@fat</td>
						</tr>
						<tr>
							<th scope="row">3</th>
							<td>Larry</td>
							<td>the Bird</td>
							<td>@twitter</td>
						</tr>
					</tbody>
				</Table>
		});
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
					<th>Number of bikes</th>
					<th>Bikes avaiable</th>
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
							<Card body className="table-scroll">
								<CardTitle>Some graph/figure</CardTitle>
								{this.state.card1}
							</Card>
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
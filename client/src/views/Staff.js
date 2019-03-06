import React, { Component } from 'react';
import { Card, CardBody, CardText, CardTitle, Row, Col, Spinner } from 'reactstrap';
import Sidebar from 'react-sidebar';
import { FaListUl } from 'react-icons/fa';

const mql = window.matchMedia(`(min-width: 10px)`);
const sidebarStyle = { background: "white", paddingTop: 55, width: 200 };


class Staff extends Component {

	constructor(props) {
		super(props);
		this.state = {
			sidebarOpen: mql.matches,
			sidebarDocked: true
		};
		this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
		this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
		this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
	}

	componentWillMount() {
		mql.addListener(this.mediaQueryChanged);
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

	render() {
		return (
			<div>
				<Sidebar
					sidebar={
						<div>
							<div className="sidebar-contents">
								Big Chunguska
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

				<div className="staff-center-page">
					<Row>
						<Col sm="6">
							<Card body>
								<CardTitle>Some graph/figure</CardTitle>
								<Spinner color="primary" />
							</Card>
						</Col>
						<Col sm="6">
							<Card body>
								<CardTitle>Some other graph/figure</CardTitle>
								<Spinner color="primary" />
							</Card>
						</Col>
					</Row>
				</div>
				<div className="staff-center-page">
					<Row>
						<Col sm="6">
							<Card body>
								<CardTitle>Some graph/figure</CardTitle>
								<Spinner color="primary" />
							</Card>
						</Col>
						<Col sm="6">
							<Card body>
								<CardTitle>Some other graph/figure</CardTitle>
								<Spinner color="primary" />
							</Card>
						</Col>
					</Row>
				</div>
			</div>
		);
	}

    render1() {
		return (
			<div>
				<Sidebar
					sidebar={
						<div>
							<div>
								<button onClick={() => this.onSetSidebarOpen(false)}>
									<FaListUl />Close Staff Sidebar
								</button>
							</div>
							<div className="sidebar-contents">
								<a href="">Sidebar content</a><br />
							</div>
							<div className="sidebar-contents">
								<a href="">Sidebar content</a><br />
							</div>
						</div>
					}
					open={this.state.sidebarOpen}
					onSetOpen={this.onSetSidebarOpen}
					styles={{
						sidebar: { background: "white", paddingTop: 55 }
					}}
				>
					<div style={{ paddingTop: '55px' }}>
						<button onClick={() => this.onSetSidebarOpen(true)}>
							<FaListUl />Open Staff Sidebar
						</button>
					</div>
				</Sidebar>
			</div>
		);
    }
}

export default Staff;
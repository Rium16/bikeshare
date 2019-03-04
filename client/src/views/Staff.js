import React, { Component } from 'react';
import Sidebar from 'react-sidebar';
import { FaListUl } from 'react-icons/fa';


class Staff extends Component {

	constructor(props) {
		super(props);
		this.state = {
			sidebarOpen: true
		};
		this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
	}

	onSetSidebarOpen(open) {
		this.setState({ sidebarOpen: open });
	}

    render() {
		return (
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
		);
    }
}

export default Staff;
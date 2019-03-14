import React, { Component } from 'react';
import { Fade } from 'reactstrap';
import { connect } from 'react-redux';
import { history } from '../services/history';
import { alertActions } from '../_actions/alertActions';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class AlertBanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        }

        history.listen((locaction, action) => {
            this.props.dispatch(alertActions.clear());
        })
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.alert.message !== prevProps.alert.message) {
            this.display();
        }
    }

    display = async() => {
        this.setState({
            visible: true
        });
        await sleep(3000);
        this.setState({
            visible: false
        })
    }   

    onClick = () => {
        this.setState({
            visible: false
        })
        this.props.dispatch(alertActions.clear());
    }


    render() {
        const display = this.state.visible ? 'inline' : 'none';

        return (
            <div>
                {this.props.alert.message &&
                <div className="alert-wrapper">
                    <Fade in={this.state.visible}>
                        <div onClick={this.onClick} className="alert-banner">
                            <p>{this.props.alert.message}</p>
                        </div>
                    </Fade>
                </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    console.log("alert");
    console.log(alert);
    return {
        alert
    }
}

export default connect(mapStateToProps)(AlertBanner);
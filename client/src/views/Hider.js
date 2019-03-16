import React, { Component } from 'react';
import { IoIosWarning } from 'react-icons/io';

export default class Hider extends Component {

    render() {
        var visible = this.props.visible ? 'inline' : 'none';
        console.log(visible);
        return (
            <div style={{display: visible}} className="hider">
                <h2 className="hider-icon"><IoIosWarning size="64"/></h2>
                <p className="hider-text">Not logged in</p>
            </div>
        )
    }
}
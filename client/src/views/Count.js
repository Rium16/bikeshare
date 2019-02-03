// A class for a count which renders in a different colour
// depending on the ratio of the current count against its
// max.

import React, { Component } from 'react';

class Count extends Component {

    chooseColour(max, current) {
        var ratio = current/max;

        if (ratio < 0.4) {
            return {
                color: 'red'
            }
        } else if (ratio < 0.7) {
            return {
                color: "orange"
            }
        } else {
            return {
                color: "green"
            }
        }

    }

    render() {
        return (
            <span 
            className={this.props.className}
            style={this.chooseColour(this.props.max, this.props.current)}
            >
            {this.props.current}
            </span>
        ) 
    }
}

export default Count;
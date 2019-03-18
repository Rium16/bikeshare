// A class for a count which renders in a different colour
// depending on the ratio of the current count against its
// max.

import React, { Component } from 'react';

class Count extends Component {

    chooseColour() {
        var ratio = this.props.current/this.props.max;

        if (ratio < 0.4) {
            return 'red'
        } else if (ratio < 0.7) {
            return 'orange'
        } else {
            return 'green'
        }

    }

    render() {
        switch(this.props.type) {
            case 'hist':
                return (
                    <div
                    style={{
                        backgroundColor: this.chooseColour(),
                        width: "10px",
                        height: `${3*this.props.current}px`,
                    }}
                    ></div>
                )
            case 'text':
            default:
                return (
                    <span 
                    className={this.props.className}
                    style={{color: this.chooseColour()}}
                    >
                    {this.props.current}
                    </span>
                ) 
        }
        
    }
}

export default Count;
import React, { Component } from 'react';
import './App.css';
import PMap from './PMap';

class App extends Component {
  state = {
    
  };

  // an example function, as it is not very useful
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();

    this.setState({ responseToPost: body });
  };

  render() {
    return (
      <div className="App">
        <PMap className="map"/>
      </div>
    );
  }
}

export default App;


import React, { Component } from 'react';
import Map from './components/Map';
import * as GoogleAPI from './utils/GoogleAPI';
import * as data from './data/locations.json';

import './App.css';

class App extends Component {
  state = {
    isAPILoaded: false,
    settings: {
      center: { lat: 59.9139, lng: 10.7522 },
      zoom: 6,
    },
    locations: data,
  };

  componentDidMount = () => {
    GoogleAPI.load()
      .then(() => {
        this.setState({ isAPILoaded: true });
      })
      .catch((error) => {
        alert(`Oops, something went wrong when trying to load: ${error.target.src}`)
      });
  };

  render() {
    return (
      <div className="App">

      {/* TODO: render header, css to move over map */}
      { this.state.isAPILoaded && (
        <Map 
          settings={this.state.settings}
          locations={this.state.locations}
        />
      )}
      
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import Map from './components/Map';
import * as GoogleAPI from './utils/GoogleAPI';

import './App.css';

class App extends Component {
  state = {
    isAPILoaded: false,
    settings: {
      center: { lat: 59.9139, lng: 10.7522 },
      zoom: 6,
    },
    locations: [],
  };

  componentDidMount = () => {
    window.initAPI = this.initAPI;

    GoogleAPI.load();
  };

  initAPI = () => {
    this.setState({isAPILoaded: true});
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

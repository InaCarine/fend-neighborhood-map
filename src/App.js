import React, { Component } from 'react';
import Map from './components/Map';
import * as GoogleAPI from './utils/GoogleAPI';

/* global google */

import './App.css';

class App extends Component {
  state = {
    isAPILoaded: false,
    map: null,
  };

  componentDidMount = () => {
    window.initAPI = this.initAPI;

    GoogleAPI.load();
  };

  initAPI = () => {
    this.setState({isAPILoaded: true});
  };

  initMap = (map) => {
    this.setState({map: map});
  };

  render() {
    return (
      <div className="App">

      {/* TODO: render header, css to move over map */}
      { this.state.isAPILoaded &&  (
        <Map initMap={this.initMap} />
      )}
      
      </div>
    );
  }
}

export default App;

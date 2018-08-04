import React, { Component } from 'react';

/* global google */

class Map extends Component {
  state = {
    map: null,
    settings: {
      center: { lat: 48.858608, lng: 2.294471 },
      zoom: 10,
    },
  };

  componentDidMount = () => {
    console.log('yo');

    this.map = new google.maps.Map(this.refs.map, {
      center: this.state.settings.center,
      zoom: 16
    });

    this.props.initMap(this.map);
  };

  render() {
    return (
      <div id="map" ref="map"></div>
    );
  }
}

export default Map;

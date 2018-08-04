import React, { Component } from 'react';
import Marker from './Marker';
import PropTypes from 'prop-types';

/* global google */

class Map extends Component {
  state = {
    map: null,
  }

  componentDidMount = () => {
    this.map = new google.maps.Map(this.refs.map, {
      center: this.props.settings.center,
      zoom: this.props.settings.zoom,
    });

    this.setState({map: this.map});
    

    // const tribeca = { lat: 59.9139, lng: 10.7522 };
    // let marker = new google.maps.Marker({
    //   position: tribeca,
    //   map: this.map,
    //   title: 'first marker!',
    // });
  };

  render() {
    return (
      <div id="map" ref="map">
      {this.state.map && (
        <Marker location={{lat: 59.9139, lng: 10.7522}} map={ this.state.map } />
      )}
      </div>
    );
  };
}

Map.propTypes = {
  settings: PropTypes.object.isRequired,
};

export default Map;

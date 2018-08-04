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
  };

  render() {
    return (
      <div id="map" ref="map">
      {this.state.map && (
        <div>
        <Marker key='hi' location={{lat: 59.9139, lng: 10.7522}} map={ this.state.map } />
            <Marker key="hi2" location={{ lat: 63.4305, lng: 10.3951}} map={ this.state.map } />
        </div>
      )}
      </div>
    );
  };
}

Map.propTypes = {
  settings: PropTypes.object.isRequired,
};

export default Map;

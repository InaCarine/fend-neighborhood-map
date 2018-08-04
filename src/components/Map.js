import React, { Component } from 'react';
import Marker from './Marker';
import PropTypes from 'prop-types';

class Map extends Component {
  state = {
    map: null,
  }

  componentDidMount = () => {
    this.map = new window.google.maps.Map(this.refs.map, {
      center: this.props.settings.center,
      zoom: this.props.settings.zoom,
    });

    this.setState({map: this.map});
  };

  render() {
    return (
      <div id="map" ref="map" role="application">
      {this.state.map && (
        <div className="markers">
          {this.props.locations.map(marker => (
            <Marker key={marker.id} location={marker.position} map={ this.state.map } />
          ))}
        </div>
      )}
      </div>
    );
  };
}

Map.propTypes = {
  settings: PropTypes.object.isRequired,
  locations: PropTypes.array.isRequired,
};

export default Map;

import React, { Component } from 'react';
import Marker from './Marker';
import InfoWindow from './InfoWindow';
import PropTypes from 'prop-types';

class Map extends Component {
  state = {
    map: null,
    marker: null,
  }

  componentDidMount = () => {
    this.map = new window.google.maps.Map(this.refs.map, {
      center: this.props.settings.center,
      zoom: this.props.settings.zoom,
    });

    this.setState({map: this.map});
  };

  setMarker = marker => {
    this.setState({marker: marker});
  };

  closeInfoWindow = () => {
    this.setState({ marker: null });
  };

  render() {
    return (
      <div id="map" ref="map" role="application">
      {this.state.map && (
        <div className="markers">
          {this.props.locations.map(marker => (
            <Marker
              key={marker.id}
              location={marker.position}
              title={marker.name}
              map={this.state.map}
              setMarker={this.setMarker}
            />
          ))}
        </div>
      )}
      {this.state.marker && (
          <InfoWindow
            marker={this.state.marker}
            map={this.state.map}
            close={this.closeInfoWindow}
          >
            <div>{this.state.marker.title}</div>
          </InfoWindow>
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

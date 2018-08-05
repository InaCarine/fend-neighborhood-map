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
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: true,
      fullscreenControl: false
    });

    this.setState({map: this.map});
  };

  componentDidUpdate = (prevProps) => {
    if(prevProps.marker === this.props.marker) return;

    let activeMarker;
    if (this.props.marker) {
      activeMarker = this.markers.filter(
        marker => marker.dataId === this.props.marker
      )[0];
    } else {
      activeMarker = this.state.marker;
    }

    this.setMarker(activeMarker);

    const bounds = new window.google.maps.LatLngBounds();
    this.markers.map(marker =>  bounds.extend(marker.position));
    this.map.fitBounds(bounds);
  };

  setMarker = marker => {
    this.setState({marker: marker});
    this.centerMap();
  };

  markers = [];
  addMarker = (marker) => {
    if(marker) this.markers.push(marker);
  };

  closeInfoWindow = () => {
    this.setState({ marker: null });
  };

  centerMap = () => {
    if(this.state.marker) {
      this.map.setCenter(this.state.marker.position);
    }
  };

  render() {
    this.centerMap();
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
                addMarker={this.addMarker}
                dataId={marker.id}
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
  marker: PropTypes.string,
};

export default Map;

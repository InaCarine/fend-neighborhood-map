import React, { Component, Fragment } from 'react';
import Marker from './Marker';
import InfoWindow from './InfoWindow';
import PropTypes from 'prop-types';

class Map extends Component {
  state = {
    map: null,
  }

  componentDidMount = () => {
    this.map = new window.google.maps.Map(this.refs.map, {
      center: this.props.settings.center,
      zoom: this.props.settings.zoom,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false
    });

    this.setState({map: this.map});
    this.setBounds();
  };

  centerMap = () => {
    if (this.props.currentMarker) {
      this.map.setCenter(this.props.currentMarker.position);
    }
  };

  setBounds = () => {
    if (!this.map) return;
    const bounds = new window.google.maps.LatLngBounds();
    this.props.locations.map(marker => bounds.extend(marker.position));
    this.map.fitBounds(bounds);
  };

  render() {
    const { map } = this.state;
    const { filteredLocations, showInfoWindow, hideInfoWindow, addMarker, currentMarker, removeMarker } = this.props;
    this.centerMap();

    return (
      <div id="map" ref="map" role="application">
        {map && (
          <Fragment>
            {filteredLocations.map(marker => (
              <Marker
                key={marker.id}
                marker={marker}
                map={map}
                showInfoWindow={showInfoWindow}
                hideInfoWindow={hideInfoWindow}
                addMarker={addMarker}
                removeMarker={removeMarker}
                currentMarker={currentMarker}
              />
            ))}
          </Fragment>
        )}
        {currentMarker && (
          <InfoWindow
            currentMarker={currentMarker}
            map={map}
            hideInfoWindow={hideInfoWindow}
          >
          </InfoWindow>
        )}
      </div>
    );
  };
}

Map.propTypes = {
  settings: PropTypes.object.isRequired,
  locations: PropTypes.array.isRequired,
  filteredLocations: PropTypes.array,
  currentMarker: PropTypes.object,
  addMarker: PropTypes.func,
  removeMarker: PropTypes.func,
  showInfoWindow: PropTypes.func,
  hideInfoWindow: PropTypes.func
};

export default Map;

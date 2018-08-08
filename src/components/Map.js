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
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.LEFT_BOTTOM
      },
      mapTypeControl: false,
      streetViewControl: true,
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
    const { filteredLocations, showInfoWindow, hideInfoWindow, addMarker, currentMarker, infoWindow, removeMarker } = this.props;
    this.centerMap();

    return (
      <div id="map" ref="map" role="application">
        {map && (
          <Fragment>
            {filteredLocations.map(marker => (
              <Marker
                key={marker.id}
                location={marker.position}
                title={marker.name}
                map={map}
                showInfoWindow={showInfoWindow}
                hideInfoWindow={hideInfoWindow}
                addMarker={addMarker}
                removeMarker={removeMarker}
                id={marker.id}
                currentMarker={currentMarker}
              />
            ))}
          </Fragment>
        )}
        {currentMarker && (
            <InfoWindow
              currentMarker={currentMarker}
              map={map}
              infoWindow={infoWindow}
              hideInfoWindow={hideInfoWindow}
            >
            <div>{currentMarker.title}</div>
            </InfoWindow>
        )}
      </div>
    );
  };
}

Map.propTypes = {
  settings: PropTypes.object.isRequired,
  locations: PropTypes.array.isRequired,
  currentMarker: PropTypes.object,
};

export default Map;

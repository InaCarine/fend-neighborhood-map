import React, { Component } from 'react';
import Marker from './Marker';
import InfoWindow from './InfoWindow';
import PropTypes from 'prop-types';

import iconMarker from '../img/icon-marker.png';
import iconMarkerFocus from '../img/icon-marker-focus.png';

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
      streetViewControl: true,
      fullscreenControl: false
    });

    this.setState({map: this.map});
    this.setBounds();
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.marker === this.props.marker) return;

    // TODO: probs can remove this now that marker state is in app
    // tho still need to get the marker object, if marker was selected from the list
    // unless I set the icon a different way, in the marker?
    let activeMarker;
    if (this.props.marker) {
      activeMarker = this.markers.filter(
        marker => marker.dataId === this.props.marker
      )[0];

    } else {
      activeMarker = this.state.marker;
    }

    // TODO: same with this, probs no point setting it here
    this.props.showInfoWindow(activeMarker);
  };

  markers = [];
  addMarker = (marker) => {
    if (marker) this.markers.push(marker);
  };

// TODO: Moved over to app, still need a way to set the icon
  setMarker = marker => {
    if (this.state.marker) this.setIcon(iconMarker);
    this.setState({marker: marker});
  };

  setIcon = (icon) => {
    const img = {
      url: icon,
      scaledSize: new window.google.maps.Size(26, 40)
    }

    this.state.marker.setIcon(img);
  };

  // TODO: Moved this to app, again still need a way to set icon
  closeInfoWindow = () => {
    this.setIcon(iconMarker);
    this.setState({ marker: null });
    this.props.setMarker('');
  };

  centerMap = () => {
    if (this.state.marker) {
      this.map.setCenter(this.state.marker.position);
    }
  };

  setBounds = () => {
    if (!this.map) return;
    const bounds = new window.google.maps.LatLngBounds();
    this.props.locations.map(marker => bounds.extend(marker.position));
    this.map.fitBounds(bounds);
  };

  render() {
    this.centerMap();
    if (this.state.marker) this.setIcon(iconMarkerFocus);

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
                showInfoWindow={this.props.showInfoWindow}
                addMarker={this.addMarker}
                dataId={marker.id}
                icon={iconMarker}
              />
            ))}
          </div>
        )}
        {this.state.marker && (
            <InfoWindow
            marker={this.state.marker}
              map={this.state.map}
              close={this.props.hideInfoWindow}
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

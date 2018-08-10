import { Component } from 'react';
import PropTypes from 'prop-types';
import iconMarker from '../img/icon-marker.png';
import iconMarkerFocus from '../img/icon-marker-focus.png';

/*
* @description: A google marker component
* methods: componentDidMount, componentWillUnmount, renderMarker, setIcon, render
* props: marker {Object}, map {Object}, showInfoWindow {func}, hideInfoWindow {func}
*        removeMarker {func}, addMarker {func}, id {String}, currentMarker {Object}
*/
class Marker extends Component {

  componentDidMount = () => {
    this.renderMarker();
  };

  /*
  * @description: Called before component gets destroyed
  * In this case it will remove the marker from the map
  * This is for when the user is searching among the markers
  */
  componentWillUnmount = () => {
      if(this.marker) {
        this.props.removeMarker(this.marker);
        this.props.hideInfoWindow();
        this.marker.setMap(null);
      }
  };

  componentDidUpdate(prevProps) {
    if (this.props.currentMarker && this.marker.id === this.props.currentMarker.id) {
      this.setIcon(iconMarkerFocus);
      this.marker.setAnimation(window.google.maps.Animation.BOUNCE);

      setTimeout(() => {
        this.marker.setAnimation(null);
      }, 400);
    } else {
      this.setIcon(iconMarker);
    }

    if (this.props.map !== prevProps.map || this.props.marker.position !== prevProps.marker.position) {
      if (this.marker) {
        this.props.removeMarker(this.marker);
        this.props.hideInfoWindow();
        this.marker.setMap(null);
      }
      this.renderMarker();
    }
  }

  /*
  * @description: creates a new google maps marker
  */
  renderMarker = () => {
    this.marker = new window.google.maps.Marker({
      position: this.props.marker.position,
      map: this.props.map,
      title: this.props.marker.name || '',
      animation: window.google.maps.Animation.DROP,
      id: this.props.marker.id,
      photo: this.props.marker.photo,
      venues: this.props.marker.venues
    });

    this.props.addMarker(this.marker);
    this.marker.addListener('click', () => {
      if (this.props.currentMarker && this.marker.id === this.props.currentMarker.id) return;
      this.props.showInfoWindow(this.marker)
    });

    this.setIcon(iconMarker);
  }

  setIcon = (icon) => {
    const img = {
      url: icon,
      scaledSize: new window.google.maps.Size(26, 40)
    }

    this.marker.setIcon(img);
  }

  render() {
    return null;
  };
};

Marker.propTypes = {
  marker: PropTypes.object.isRequired,
  map: PropTypes.object.isRequired,
  addMarker: PropTypes.func.isRequired,
};

export default Marker;
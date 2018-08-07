import { Component } from 'react';
import PropTypes from 'prop-types';
import iconMarker from '../img/icon-marker.png';
import iconMarkerFocus from '../img/icon-marker-focus.png';
// TODO: If no state, might be able to change this to stateless function

/*
* @description: A google marker component
* methods: componentDidMount, componentWillUnmount, render, renderMarker
* props: location {Object}, map {Object}, title {String},
*        setMarker {func}, addMarker {func}, id {String}
*/
class Marker extends Component {
  /*
  * @description: Called after component have mounted
  */
  componentDidMount = () => {
    this.renderMarker();
  };

  /*
  * @description: Called before component gets destroyed
  * In this case it will remove the marker from the map
  * This is for when the user is searching among the markers
  */
  componentWillUnmount = () => {
      //this.marker.setMap(null);
      if(this.marker) {
        this.props.removeMarker(this.marker);
        this.props.hideInfoWindow();
        this.marker.setMap(null);
      }
  };

  componentDidUpdate(prevProps) {
    if (this.props.currentMarker && this.marker.id === this.props.currentMarker.id) {
      this.setIcon(iconMarkerFocus);
    } else {
      this.setIcon(iconMarker);
    }

    if (this.props.map !== prevProps.map || this.props.location !== prevProps.location) {
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
      position: this.props.location,
      map: this.props.map,
      title: this.props.title || '',
      animation: window.google.maps.Animation.DROP,
      id: this.props.id,
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

  /*
  * @description: renders the component
  * In this case, nothing needs to be rendered
  */
  render() {
    return null;
  };
};

/*
* @description: The required props for the component
*/
Marker.propTypes = {
  location: PropTypes.object.isRequired,
  map: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  addMarker: PropTypes.func.isRequired,
};

export default Marker;
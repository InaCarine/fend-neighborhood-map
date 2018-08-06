import { Component } from 'react';
import PropTypes from 'prop-types';

// TODO: If no state, might be able to change this to stateless function

/*
* @description: A google marker component
* methods: componentDidMount, componentWillUnmount, render, renderMarker
* props: location {Object}, map {Object}, title {String},
*        setMarker {func}, addMarker {func}, dataId {String}
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
    if(this.marker) {
      // TODO: If infoWindow is open, close it (when searching)
      this.props.hideInfoWindow();
      //this.props.setMarker(null);
      this.marker.setMap(null);
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
      dataId: this.props.dataId,
    });

    this.setIcon(this.props.icon);

    this.props.addMarker(this.marker);
    this.marker.addListener('click', () => {
      this.props.showInfoWindow(this.marker)
    });
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
  dataId: PropTypes.string.isRequired,
  setMarker: PropTypes.func.isRequired,
  addMarker: PropTypes.func.isRequired,
};

export default Marker;

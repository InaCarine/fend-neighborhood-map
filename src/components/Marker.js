import { Component } from 'react';
import PropTypes from 'prop-types';

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
  */
  componentWillUnmount = () => {
    if(this.marker) {
      this.props.setMarker(null);
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
    });

    this.marker.dataId = this.props.dataId;
    this.props.addMarker(this.marker);
    this.marker.addListener('click', () => { this.props.setMarker(this.marker) });
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
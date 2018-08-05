import { Component } from 'react';
import PropTypes from 'prop-types';

/*
* @description: A google marker component
* methods: componentDidMount, componentWillUnmount, render
* props: location {Object}, map {Object}, title {String}, setMarker {func}
*/
class Marker extends Component {
  componentDidMount = () => {
    this.marker = new window.google.maps.Marker({
      position: this.props.location,
      map: this.props.map,
      title: this.props.title || '',
      animation: window.google.maps.Animation.DROP,
    });

    this.marker.addListener('click', () => { this.props.setMarker(this.marker)});
  };

  componentWillUnmount = () => {
    if(this.marker) {
      this.marker.setMap(null);
    }
  }

  render() {
    return null;
  };
};

Marker.propTypes = {
  location: PropTypes.object.isRequired,
  map: PropTypes.object.isRequired,
  setMarker: PropTypes.func.isRequired,
};

export default Marker;
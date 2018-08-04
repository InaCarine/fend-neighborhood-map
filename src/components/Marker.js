import { Component } from 'react';
import PropTypes from 'prop-types';

class Marker extends Component {
  componentDidMount = () => {
    this.marker = new window.google.maps.Marker({
      position: this.props.location,
      map: this.props.map,
      title: this.props.title,
      animation: window.google.maps.Animation.DROP,
    });

    this.marker.addListener('click', () => { this.props.setMarker(this.marker)});
  };

  render() {
    return null;
  };
};

Marker.propTypes = {
  location: PropTypes.object.isRequired,
  map: PropTypes.object.isRequired,
};

export default Marker;
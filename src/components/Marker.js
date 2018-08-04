import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* global google */

class Marker extends Component {
  componentDidMount = () => {
    this.marker = new google.maps.Marker({
      position: this.props.location,
      map: this.props.map,
      title: 'first marker!',
    });
  };

  render() {
    return null;
  };
};

export default Marker;
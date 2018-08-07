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
      //this.marker.setMap(null);
      if(this.marker) {
        this.props.removeMarker(this.marker);
        this.props.hideInfoWindow();
        this.marker.setMap(null);
      }
  };

  componentDidUpdate(prevProps) {
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
      dataId: this.props.dataId,
    });


    //this.setIcon(this.props.icon);

    this.props.addMarker(this.marker);
    this.marker.addListener('click', () => {
      if(this.marker === this.props.currentMarker) return;
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
    if (this.marker === this.props.currentMarker) {
      //console.log(this.marker);

    }
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
  addMarker: PropTypes.func.isRequired,
};

export default Marker;

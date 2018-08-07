import { Component } from 'react';
import ReactDOMServer from "react-dom/server";
import PropTypes from 'prop-types';

class InfoWindow extends Component {
  componentDidMount = () => {
    this.renderInfoWindow();
  };

  componentWillUnmount = () => {
    if (this.infoWindow) {
      this.infoWindow.marker = null;
      this.infoWindow.close();
      this.infoWindow = null;
      this.props.hideInfoWindow();
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.currentMarker.position !== this.props.currentMarker.position) {
      this.infoWindow.marker = this.props.currentMarker;
      this.infoWindow.open(this.props.map, this.props.currentMarker);
    }

    if (prevProps.children !== this.props.children) {
      this.children = ReactDOMServer.renderToString(this.props.children);
      this.infoWindow.setContent(this.children);
    }
  };

  renderInfoWindow = () => {

    this.infoWindow = new window.google.maps.InfoWindow();
    this.infoWindow.marker = this.props.currentMarker;
    this.children = ReactDOMServer.renderToString(this.props.children);
    this.infoWindow.setContent(this.children);
    this.infoWindow.open(this.props.map, this.props.currentMarker);

    this.infoWindow.addListener('closeclick', () => {
      if (this.infoWindow) {
        this.infoWindow.marker = null;
        this.infoWindow.close();
        this.props.hideInfoWindow();
        this.infoWindow = null;
      }
    });
  };

  render() {
    return null;
  };
};

InfoWindow.propTypes = {
  currentMarker: PropTypes.object.isRequired,
  map: PropTypes.object.isRequired,
  hideInfoWindow: PropTypes.func.isRequired,
};

export default InfoWindow;
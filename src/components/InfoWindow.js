import { Component } from 'react';
import ReactDOMServer from "react-dom/server";
import PropTypes from 'prop-types';

class InfoWindow extends Component {
  componentDidMount = () => {
    this.children = ReactDOMServer.renderToString(this.props.children);

    this.infoWindow = new window.google.maps.InfoWindow();
    this.infoWindow.marker = this.props.marker;
    this.infoWindow.setContent(this.children);
    this.infoWindow.open(this.props.map, this.props.marker);

    this.infoWindow.addListener('closeclick', () => {
      this.infoWindow.marker = null;
      this.props.close(this.infoWindow);
      this.infoWindow = null;
    });

  };

  componentDidUpdate = (prevProps) => {
    if(prevProps.marker === this.props.marker) return;

    this.children = ReactDOMServer.renderToString(this.props.children);
    this.infoWindow.marker = this.props.marker;
    this.infoWindow.setContent(this.children);
    this.infoWindow.open(this.props.map, this.props.marker);
  };

  render() {
    return null;
  };
};

InfoWindow.propTypes = {
  marker: PropTypes.object.isRequired,
  map: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
};

export default InfoWindow;
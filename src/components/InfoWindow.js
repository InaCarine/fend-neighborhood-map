import React, { Component } from 'react';
import ReactDOMServer from "react-dom/server";
import PropTypes from 'prop-types';
import osloIMG from '../img/tmp.jpg';

class InfoWindow extends Component {
  componentDidMount = () => {
    this.renderInfoWindow();
  };

  componentWillUnmount = () => {
    this.closeWindow();
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
      this.closeWindow();
    });
  };

  closeWindow = () => {
    if (this.infoWindow) {
      this.infoWindow.marker = null;
      this.infoWindow.close();
      this.props.hideInfoWindow();
      this.infoWindow = null;
    }
  };

  render() {
    let localTime = new Date().toLocaleTimeString("en-GB", { timeZone: "Europe/Oslo", hour: '2-digit', minute: '2-digit' });

    return (
      <div className="location-info">
        <div className="location-info-wrapper">
        {/* TODO: Change focus to this when open? */}
          <div className="location-info__header" aria-label="Location information" tabIndex="-1">
          {/* // TODO: set alt */}

            <div className="location-info__title">
              <h2>
                {this.props.children}
                <span className="country">Norway</span>
              </h2>
              <span className="time">{localTime}</span>
              {/* TODO: Move close infoindow stuff to a function */}
              <button onClick={this.closeWindow} className="close"><span className="visually-hidden">Close location info</span><span aria-hidden="true">X</span></button>
            </div>
            <img src={this.props.currentMarker.photo} alt="" />
          </div>

          <div className="location-info__content">
            <h3 className="location-info__content-title">Venues</h3>
            <div className="location-info__venue">
              <img className="venue__img" src={osloIMG} alt="" />
              <h4 className="venue__name">Egon</h4>
            </div>

            <div className="location-info__venue">
              <img className="venue__img" src={osloIMG} alt="" />
              <h4 className="venue__name">Egon</h4>
            </div>

            <div className="location-info__venue">
              <img className="venue__img" src={osloIMG} alt="" />
              <h4 className="venue__name">Egon</h4>
            </div>
          </div>

        </div>
      </div>
    )
  };
};

InfoWindow.propTypes = {
  currentMarker: PropTypes.object.isRequired,
  map: PropTypes.object.isRequired,
  hideInfoWindow: PropTypes.func.isRequired,
};

export default InfoWindow;
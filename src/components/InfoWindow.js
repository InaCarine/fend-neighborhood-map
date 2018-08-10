import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

    if (prevProps.currentMarker.title !== this.props.currentMarker.title) {
      this.infoWindow.setContent(this.props.currentMarker.title);
    }
  };

  renderInfoWindow = () => {
    this.infoWindow = new window.google.maps.InfoWindow();
    this.infoWindow.marker = this.props.currentMarker;
    this.infoWindow.setContent(this.props.currentMarker.title);
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
    const {currentMarker} = this.props;
    let localTime = new Date().toLocaleTimeString("en-GB", { timeZone: "Europe/Oslo", hour: '2-digit', minute: '2-digit' });

    return (
      <div className="location-info">
        <div className="location-info-wrapper">
          <div className="location-info__header" aria-label="Location information" tabIndex="-1">
            <div className="location-info__title">
              <h2>
                {currentMarker.title}
                <span className="country">Norway</span>
              </h2>
              <span className="time">{localTime}</span>
              <button onClick={this.closeWindow} className="close"><span className="visually-hidden">Close location info</span><span aria-hidden="true">X</span></button>
            </div>
            <img src={currentMarker.photo} alt="" />
          </div>

          <div className="location-info__content">
            <h3 className="location-info__content-title">Venues</h3>
            {currentMarker.venues.map(venue => (
              <div key={venue.venue.id} className="location-info__venue">
                <h4 className="venue__name">{venue.venue.name}</h4>
                <p className="venue__category">{venue.venue.categories[0].name}</p>
                <address className="venue__address">
                  {venue.venue.location.address &&
                    <span>{venue.venue.location.address}</span>
                  }
                  {venue.venue.location.city &&
                    <span>{venue.venue.location.city}</span>
                  }
                  Norway
                </address>
              </div>
            ))}

            <small className="credit">Venue information from Foursquare</small>
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
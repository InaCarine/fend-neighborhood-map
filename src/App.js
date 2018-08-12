import React, { Component, Fragment } from 'react';
import Map from './components/Map';
import Header from './components/Header';
import ListLocations from './components/ListLocations';

import * as GoogleAPI from './utils/GoogleAPI';
import * as data from './data/locations.json';

import './App.css';

class App extends Component {
  state = {
    isAPILoaded: false,
    isDataLoaded: false,
    error: '',
    settings: {
      center: { lat: 59.9139, lng: 10.7522 },
      zoom: 8,
    },
    locations: data,
    filteredLocations: data,
    query: '',
    currentMarker: null,
  };

  componentDidMount = () => {
    // Load the map and get the data from Foursquare
    if(!this.state.isDataLoaded && !this.state.isAPILoaded) {
      this.loadMap();
      this.addVenues();
    }
  };

  // Keeps track of the markers
  markers = [];
  addMarker = (marker) => {
    if (marker) this.markers.push(marker);
  };

  // Removes the marker
  removeMarker = (marker) => {
    if (marker) {
      const updatedMarkers = this.markers.filter(m => m.id !== marker.id);
      this.markers = updatedMarkers;
    }
  };

  // Find the marker that matches the location selected from the locations list
  findMarker = (id) => {
    const activeMarker = this.markers.filter(marker => marker.id === id)[0];
    this.showInfoWindow(activeMarker);
  };

  // Shows the info window when a marker have been selected
  showInfoWindow = (marker) => {
    if (marker === this.state.currentMarker) return;
    this.setState({currentMarker: marker});
  };

  // Hides the infowindow
  hideInfoWindow = () => {
    this.setState({currentMarker: null});
  };

  // Handles the query and filters the locations based on it
  handleSearch = (event) => {
    const query = event.target.value;
    this.setState({ query: query.trim() });
    this.filterLocations();
  };

  filterLocations() {
    const { locations, query, isAPILoaded } = this.state;
    let filtered;

    if (query && isAPILoaded) {
      // https://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
      const escapeString = query.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
      const match = new RegExp(escapeString, 'i');
      filtered = locations.filter((location) => match.test(location.name));
    } else {
      filtered = locations;
    }

    return filtered;
  }

  loadMap = () => {
    GoogleAPI.load()
      .then(() => {
        if (window.google === undefined) {
          throw Error();
        }

        this.setState({ isAPILoaded: true });
      })
      .catch(() => {
        this.setState({ isAPILoaded: false, error: 'Failed to load Google Maps' });
      });

    window.gm_authFailure = () => {
      this.setState({ isAPILoaded: false, error: 'Failed to connect to Google Maps' });
    };
  };

  //https://stackoverflow.com/questions/42847126/script-load-in-react
  //https://stackoverflow.com/questions/38016471/do-multiple-fetch-promises
  addVenues = () => {
    // Sets up a promise for each location that needes data fetched
    var promises = this.state.locations.map(location => {
      return this.fetchLocationData(`${location.position.lat},${location.position.lng}`)
        .then(data => {
          location.venues = data.response.groups[0].items;
          return data;
        })
    });

    // Then when done update the state based on success or error
    return Promise.all(promises)
      .then(() => {
        this.setState({ isDataLoaded: true });
      })
      .catch(error => {
        this.setState({ isDataLoaded: false, error: error.toString() });
      });
  };

  // Fetches data from the Foursquare API based on the location given
  // https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
  fetchLocationData = (position) => {
    const url = 'https://api.foursquare.com/v2/venues/explore';
    const client_id = 'VLYXZK00M53WWOEMPTSFOHD0AF0KYGDRTS0GOPCDQ5OGTGW0';
    const client_secret = '5O3AKQS3MXFSO2H1GR3AG5BKN3IUD3SJ1GCSNGB5AR21EVLQ';
    return fetch(`${url}?client_id=${client_id}&client_secret=${client_secret}&v=20180323&ll=${position}&limit=3`)
      .then(response => {
        if(!response.ok) {
          throw Error(response.statusText);
        }
        return response.json()
      });
  };

  render() {
    const { query, isAPILoaded, isDataLoaded, settings, currentMarker, locations, error } = this.state;
    const filteredLocations = this.filterLocations();

    let errorMessage;
    if(error) {
      errorMessage = !isAPILoaded ? '' :
                                    'Foursquare API - ';
    }

    return (
      <div className="App">
        <Header query={query} handleSearch={this.handleSearch} />
        {isAPILoaded && isDataLoaded && (
          <Fragment>
            <ListLocations filteredLocations={filteredLocations} findMarker={this.findMarker} />
            <Map
              settings={settings}
              locations={locations}
              filteredLocations={filteredLocations}
              addMarker={this.addMarker}
              removeMarker={this.removeMarker}
              currentMarker={currentMarker}
              showInfoWindow={this.showInfoWindow}
              hideInfoWindow={this.hideInfoWindow}
              />
          </Fragment>
        )}
        {((!isAPILoaded) || !isDataLoaded) && error && (
          <div className="error">The following error occured when trying to load the application:<br /> {errorMessage} {error}</div>
        )}
      </div>
    );
  }
}

export default App;

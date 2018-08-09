import React, { Component } from 'react';
import Map from './components/Map';
import Header from './components/Header';
import ListLocations from './components/ListLocations';

import * as GoogleAPI from './utils/GoogleAPI';
import * as data from './data/locations.json';

import './App.css';

class App extends Component {
  state = {
    isAPILoaded: 'false',
    isDataLoaded: 'false',
    settings: {
      center: { lat: 59.9139, lng: 10.7522 },
      zoom: 8,
    },
    locations: data,
    filteredLocations: data,
    query: '',
    currentMarker: null,
    infoWindow: false,
  };

  markers = [];
  addMarker = (marker) => {
    if (marker) this.markers.push(marker);
  };

  removeMarker = (marker) => {
    if (marker) {
      const updatedMarkers = this.markers.filter(m => m.id !== marker.id);
      this.markers = updatedMarkers;
    }
  };

  findMarker = (id) => {
    const activeMarker = this.markers.filter(marker => marker.id === id)[0];
    this.showInfoWindow(activeMarker);
  };

  showInfoWindow = (marker) => {
    if (marker === this.state.currentMarker) return;
    this.setState({currentMarker: marker, infoWindow: true});
  };

  hideInfoWindow = () => {
    this.setState({currentMarker: null, infoWindow: false});
  };

  handleSearch = (event) => {
    const query = event.target.value;
    this.setState({ query: query.trim() });
    this.filterLocations();
  };

  filterLocations() {
    const { locations, query, isAPILoaded } = this.state;
    let filtered;

    if (query && isAPILoaded === 'true') {
      // https://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
      const escapeString = query.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
      const match = new RegExp(escapeString, 'i');
      filtered = locations.filter((location) => match.test(location.name));
    } else {
      filtered = locations;
    }

    return filtered;
  }

  //https://stackoverflow.com/questions/42847126/script-load-in-react
  loadAPIS = () => {
    //this.setState({ isAPILoaded: 'loading', isDataLoaded: 'loading' });
    GoogleAPI.load()
      .then(() => {
        //https://stackoverflow.com/questions/38016471/do-multiple-fetch-promises
        let promises = this.state.locations.map(location => this.fetchLocationData(`${location.position.lat},${location.position.lng}`, location));

        return Promise.all(promises);
      })
      .then(() => {
        this.setState({ isAPILoaded: 'true', isDataLoaded: 'true' });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isAPILoaded: 'false', isDataLoaded: 'false' });
      });
  };

  fetchLocationData = (position, location) => {
    const url = 'https://api.foursquare.com/v2/venues/explore';
    const client_id = 'VLYXZK00M53WWOEMPTSFOHD0AF0KYGDRTS0GOPCDQ5OGTGW0';
    const client_secret = '5O3AKQS3MXFSO2H1GR3AG5BKN3IUD3SJ1GCSNGB5AR21EVLQ';
    return fetch(`${url}?client_id=${client_id}&client_secret=${client_secret}&v=20180323&ll=${position}&limit=5`)
      .then(response => response.json()) // parses response to JSON
      .then(data => {
        location.venues = data.response.groups[0].items;
      })
      .catch(error => console.error(`Fetch Error =\n`, error));
  };

  render() {
    const { query, isAPILoaded, isDataLoaded, settings, currentMarker, infoWindow, locations } = this.state;
    const filteredLocations = this.filterLocations();
    const isAPIsLoaded = isAPILoaded === 'true' && isDataLoaded === 'true';

    if (isAPILoaded === 'false') {
      setTimeout(() => {
        this.loadAPIS();
      }, 0);
    }

    return (
      <div className="App">
        <Header query={query} handleSearch={this.handleSearch} />
        {isAPIsLoaded && (
          <ListLocations filteredLocations={filteredLocations} findMarker={this.findMarker} />
        )}
        {isAPIsLoaded && (
          <Map
            settings={settings}
            locations={locations}
            filteredLocations={filteredLocations}
            addMarker={this.addMarker}
            removeMarker={this.removeMarker}
            currentMarker={currentMarker}
            infoWindow={infoWindow}
            showInfoWindow={this.showInfoWindow}
            hideInfoWindow={this.hideInfoWindow}
            />
        )}
      </div>
    );
  }
}

export default App;

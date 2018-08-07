import React, { Component } from 'react';
import Map from './components/Map';
import * as GoogleAPI from './utils/GoogleAPI';
import * as data from './data/locations.json';

import './App.css';

class App extends Component {
  state = {
    isAPILoaded: false,
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

  //https://stackoverflow.com/questions/42847126/script-load-in-react
  loadAPIS = () => {
    GoogleAPI.load()
      .then(() => {
        this.setState({ isAPILoaded: true });
      })
      .catch(() => {
        this.setState({ isAPILoaded: false });
      });
  }

  render() {
    console.log(this.markers);
    const { query, isAPILoaded, settings, currentMarker, infoWindow, locations } = this.state;
    const filteredLocations = this.filterLocations();

    if (this.state.isAPILoaded === false) {
      setTimeout(() => {
        this.loadAPIS();
      }, 0);
    }

    return (
      <div className="App">
        <header>
          {/* TODO: Add form, label, accessible */}
            <input name="search" type="text" placeholder="Search..." value={query} onChange={this.handleSearch} />
        </header>
        { isAPILoaded && (
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
        {isAPILoaded && (
          <nav>
            <ul className="locations">
              {filteredLocations.map(marker => (
                <li
                  key={marker.id} className="location">
                    <button onClick={() => {this.findMarker(marker.id)}}>{marker.name}</button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    );
  }
}

export default App;

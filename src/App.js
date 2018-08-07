import React, { Component } from 'react';
import Map from './components/Map';
import * as GoogleAPI from './utils/GoogleAPI';
import * as data from './data/locations.json';

import './App.css';

// TODO: Add error window

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

  componentDidMount = () => {
    GoogleAPI.load()
      .then(() => {
        this.setState({ isAPILoaded: true });
      })
      .catch((error) => {
        alert(`Oops, something went wrong when trying to load: ${error.target.src}`)
      });
  };

  addMarker = (marker) => {
    if (marker) this.markers.push(marker);
  };
  removeMarker = (marker) => {
    if (marker) this.markers.filter(m => m !== marker);
  };

  // TODO: Could I just send the id, then do a check in Marker.js if id's match?
  findMarker = (id) => {
    const activeMarker = this.markers.filter(marker => marker.dataId === id)[0];
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

  render() {
    const { query, isAPILoaded, settings, currentMarker, infoWindow, locations } = this.state;
    const filteredLocations = this.filterLocations();
    console.log(this.markers);

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

        {/* TODO: Move to a new component? */}
        <nav>
          {/* TODO: button to show/hide locations */}
          <ul className="locations">
            {filteredLocations.map(marker => (
              <li
                key={marker.id} className="location">
                {/* TODO: Move to component? */}
                  <button onClick={() => {this.findMarker(marker.id)}}>{marker.name}</button>
              </li>
            ))}
          </ul>
        </nav>

      </div>
    );
  }
}

export default App;

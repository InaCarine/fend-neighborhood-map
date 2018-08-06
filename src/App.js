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
    query: '',
    marker: null,
    infoWindow: false,
  };

  componentDidMount = () => {
    GoogleAPI.load()
      .then(() => {
        this.setState({ isAPILoaded: true });
      })
      .catch((error) => {
        alert(`Oops, something went wrong when trying to load: ${error.target.src}`)
      });
  };

  handleSearch = (event) => {
    const query = event.target.value;
    this.setState({ query: query.trim(), marker: '' });
  };

  showInfoWindow = (marker) => {
    this.setState({marker: marker, infoWindow: true});
  };
  
  hideInfoWindow = () => {
    this.setState({marker: null, infoWindow: false});
  };

  render() {
    const { locations, query } = this.state;
    let showingMarkers;

    console.log(this.state.marker);

    if (query) {
      // https://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
      const escapeString = query.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
      const match = new RegExp(escapeString, 'i');
      showingMarkers = locations.filter((location) => match.test(location.name));
    } else {
      showingMarkers = locations;
    }

    return (
      <div className="App">

        <header>
          {/* TODO: Add form, label, accessible */}
            <input name="search" type="text" placeholder="Search..." value={this.state.query} onChange={this.handleSearch} />
        </header>
        { this.state.isAPILoaded && (
          <Map
            settings={this.state.settings}
            locations={showingMarkers}
            marker={this.state.marker}
            infoWindow={this.state.infoWindow}
            showInfoWindow={this.showInfoWindow}
            hideInfoWindow={this.hideInfoWindow}
            />
        )}

        {/* TODO: Move to a new component? */}
        <nav>
          {/* TODO: button to show/hide locations */}
          <ul className="locations">
            {showingMarkers.map(marker => (
              <li
                key={marker.id} className="location">
                {/* TODO: Move to component? */}
                  <button onClick={() => {this.showInfoWindow(marker.id)}}>{marker.name}</button>
              </li>
            ))}
          </ul>
        </nav>

      </div>
    );
  }
}

export default App;

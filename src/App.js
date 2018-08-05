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
      zoom: 6,
    },
    locations: data,
    query: '',
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
    this.setState({ query: query.trim() });
  };

  render() {
    const { locations, query } = this.state;
    let showingMarkers;

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
            <input name="search" type="text" placeholder="Search..." value={this.state.query} onChange={this.handleSearch} />
        </header>
        { this.state.isAPILoaded && (
          <Map
            settings={this.state.settings}
            locations={showingMarkers}
            />
        )}

      </div>
    );
  }
}

export default App;

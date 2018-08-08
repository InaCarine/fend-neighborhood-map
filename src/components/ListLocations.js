import React from 'react';
import PropTypes from 'prop-types';

/*
* @description: List of the available locations
* props: filteredLocations {Array}, findMarker {func}
*/
const ListLocations = ({ filteredLocations, findMarker }) => {
  return (
    <nav>
      <ul className="locations">
        {filteredLocations.map(marker => (
          <li
            key={marker.id} className="location">
            <button onClick={() => { findMarker(marker.id) }}>{marker.name}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

ListLocations.propTypes = {
  filteredLocations: PropTypes.array.isRequired,
  findMarker: PropTypes.func.isRequired
}

export default ListLocations;

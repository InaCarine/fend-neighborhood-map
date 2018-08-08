import React from 'react';
import PropTypes from 'prop-types';

/*
* @description: List of the available locations
* props: filteredLocations {Array}, findMarker {func}
*/
const ListLocations = ({ filteredLocations, findMarker }) => {
  const toggleLocations = event => {
    const button = event.target;
    const expanded = button.getAttribute('aria-expanded') === 'true';

    button.setAttribute('aria-expanded', !expanded);
    button.nextSibling.classList.toggle('open');
  };

  const closeLocations = (marker) => {
    console.log(marker);
    findMarker(marker);
    document.querySelector('.btn-locations').setAttribute('aria-expanded', false);
    document.querySelector('.locations').classList.remove('open');
  }

  return (
    <nav className="nav-locations">
      <button aria-expanded="false" className="btn-locations" onClick={toggleLocations}><span className="visually-hidden">View locations</span></button>
      <ul hidden className="locations">
        {filteredLocations.map(marker => (
          <li key={marker.id} className="location">
            <button onClick={() => { closeLocations(marker.id) }}>{marker.name}</button>
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

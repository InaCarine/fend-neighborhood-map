import React from 'react';
import PropTypes from 'prop-types';

/*
* @description: List of the available locations
* props: filteredLocations {Array}, findMarker {func}
* methods: toggleLocations, closeLocations
*/
const ListLocations = ({ filteredLocations, findMarker }) => {

  /*
  * @description: Click event for toggling the location list.
  * Toggle tabindex to make it non-focusable when off screen
  */
  const toggleLocations = event => {
    const button = event.target;
    const expanded = button.getAttribute('aria-expanded') === 'true';

    const locButtons = document.querySelectorAll('.location button');
    for (const locButton of locButtons) {
      locButton.setAttribute('tabindex', !expanded ? 0 : -1);
    }

    button.setAttribute('aria-expanded', !expanded);
    button.nextSibling.classList.toggle('open');
  };

  /*
  * @description: Close the location list when one of the locations are selected
  */
  const closeLocations = (marker) => {
    findMarker(marker);
    document.querySelector('.btn-locations').setAttribute('aria-expanded', false);
    const locButtons = document.querySelectorAll('.location button');
    for (const locButton of locButtons) {
      locButton.setAttribute('tabindex', -1);
    }
    document.querySelector('.locations').classList.remove('open');
  }

  return (
    <nav className="nav-locations">
      <button aria-expanded="false" className="btn-locations" onClick={toggleLocations}><span className="visually-hidden">View locations</span></button>
      <ul className="locations">
        {filteredLocations.map(marker => (
          <li key={marker.id} className="location">
            <button tabIndex="-1" onClick={() => { closeLocations(marker.id) }}>{marker.name}</button>
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

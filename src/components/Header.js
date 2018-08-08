import React from 'react';
import PropTypes from 'prop-types';

/*
* @description: Header component with search
* props: query {String}, handleSearch {func}
*/
const Header = ({ query, handleSearch }) => {
  return (
    <header className="header">
      <h1 className="logo">
        Tour <span className="small">de</span> <span className="norway">Norway</span>
      </h1>
      <nav className="search">
        <label className="search__label visually-hidden" htmlFor="search">
          Search
          </label>
        <input
          id="search"
          className="search__input"
          name="search"
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleSearch}
        />
      </nav>
    </header>
  );
}

Header.propTypes = {
  query: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired
}

export default Header;

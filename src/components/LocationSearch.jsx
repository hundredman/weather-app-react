
import React, { useState } from 'react';

const LocationSearch = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="location-search-form">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a city..."
        className="location-search-input"
      />
      <button type="submit" className="location-search-button">
        Search
      </button>
    </form>
  );
};

export default LocationSearch;

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import cars from '../data/carsData';
import '../styles/SearchResults.css'; 

const SearchResults = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search).get('q');

  const data = [
    { name: 'Map', path: '/map', content: 'Map page content' },
    { name: 'Profile', path: '/profile', content: 'Profile page content' },
    { name: 'Car List', path: '/car-list', content: 'Car list page content' },
    { name: 'Saved', path: '/saved', content: 'Saved cars and preferences' },
    { name: 'Settings', path: '/settings', content: 'Settings page content' },
    ...cars.map(car => ({ id: car.id, name: `${car.brand} ${car.model}`, path: `/map?carId=${car.id}`, content: car.description })),
    // ניתן להוסיף כאן דפים נוספים ותוכן חיפוש
  ];

  const fuse = new Fuse(data, {
    keys: ['name', 'content'],
    threshold: 0.1, // סף דיוק החיפוש Scaled from 0.1 to 1 - 0.1 being the most accurate.
  });

  const results = fuse.search(query);

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="search-results">
      <h1>Search Results</h1>
      <p className="search-query">found {results.length} results for: <strong>{query}</strong></p>
      {results.length > 0 ? (
        <div className="results-list">
          {results.map(result => (
            <div key={result.item.id} className="result-item" onClick={() => handleNavigate(result.item.path)}>
              <h2>{result.item.name}</h2>
              <p>{result.item.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-results">No results found</p>
      )}
    </div>
  );
};

export default SearchResults;
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { mdiMapMarkerQuestionOutline, mdiCarSeat } from '@mdi/js';
import Icon from '@mdi/react';

import ThemeToggle from './design/themeToggle';
import { calculateDistance } from '../utils/distanceCalculator';
import '../styles/infoWindow.css'

const CarInfoWindow = ({ selectedCar, toggleTheme, userLocation }) => {

  const distance = calculateDistance(userLocation, selectedCar.coordinates);

  return (
    <div className="popup-window">
      <img
        src={selectedCar.image}
        alt={`${selectedCar.brand} ${selectedCar.model}`}
      />
      <h2>{selectedCar.brand} {selectedCar.model}</h2>
      <p>Category: {selectedCar.category}</p>
      <p>Seats: {selectedCar.seats}</p>
      <p>Year: {selectedCar.year}</p>
      <p>Price per Hour: ${selectedCar.pricePerHour}</p>
      <div className="location-info">
        {distance ? (
          <>
            <span>Distance: {distance}</span>
            <FontAwesomeIcon icon={faLocationArrow} />
          </>
        ) : (
          <>
            <span>No distance available</span>
            <Icon path={mdiMapMarkerQuestionOutline} size={1} />
          </>
        )}
      </div>
      <ThemeToggle toggleTheme={toggleTheme} />
    </div>
  );
};

export default CarInfoWindow;
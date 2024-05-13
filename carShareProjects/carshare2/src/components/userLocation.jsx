import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocation } from '@fortawesome/free-solid-svg-icons';

const LocationButton = ({onClick}) => {
  return (
    <div className='location-button'>
      <button onClick={onClick} className='faLocation'>
        <FontAwesomeIcon icon={faLocation} />
      </button>
    </div>
  );
};

const UserLocation = ({ onUserLocationChange }) => {
  // Function to handle click on location button
  const handleLocationButtonClick = () => {
    // Request user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Pass obtained location to parent component
        onUserLocationChange({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  };
  return (
    <LocationButton onClick={handleLocationButtonClick} />
  );
};
export { LocationButton, UserLocation };
// export default UserLocation;
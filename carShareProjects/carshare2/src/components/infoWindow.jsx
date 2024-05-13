import React from 'react';
import ThemeToggle from './design/themeToggle';
import haversine from 'haversine-distance';


const CarInfoWindow = ({ selectedCar, toggleTheme, userLocation }) => {

    const calculateDistance = () => {
        if (!userLocation) return "location unavailable"; 
        const distanceInMeters = haversine([userLocation.lat, userLocation.lng], [selectedCar.coordinates.lat, selectedCar.coordinates.lng]);
        const distance = distanceInMeters > 1000 ? (distanceInMeters / 1000).toFixed(2) + " km" : distanceInMeters.toFixed(2) + " meter";
        return distance;
    };

    const distance = calculateDistance();


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
      <p>Distance from your location: {distance}</p>
      <ThemeToggle toggleTheme={toggleTheme} />

    </div>
  );
};

export default CarInfoWindow;

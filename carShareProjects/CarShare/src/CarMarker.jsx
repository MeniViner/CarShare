import React from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import haversine from 'haversine-distance'

const CarMarker = ({ car, position, userLocation, handleOrderClick }) => {
  const [isInfoWindowOpen, setIsInfoWindowOpen] = React.useState(false);
  const toggleInfoWindow = () => setIsInfoWindowOpen(!isInfoWindowOpen);


  //, { unit: 'km' }
  const distanceInMeters = haversine([userLocation.lat, userLocation.lng], [position.lat, position.lng]);
  const distance = distanceInMeters > 1000 ? (distanceInMeters / 1000).toFixed(2) + " km" : distanceInMeters.toFixed(2) + " meter";

  return (
    <Marker position={position} onClick={toggleInfoWindow}>
      {isInfoWindowOpen && (
        <InfoWindow onCloseClick={toggleInfoWindow}>
          <div className="popup-window">
            <h2>{car.brand} {car.model}</h2>
            <img
              src={car.image}
              alt={`${car.brand} ${car.model}`}
            />
            <p>Category: {car.category}</p>
            <p>Seats: {car.seats}</p>
            <p>Year: {car.year}</p>
            <p>Price per Hour: ${car.pricePerHour}</p>
            <p>Distance from your location: {distance}</p>
            <button onClick={() => handleOrderClick(car)}>Order Now</button>
          </div>
        </InfoWindow>
      )}
    </Marker>
  );
};

export default CarMarker;
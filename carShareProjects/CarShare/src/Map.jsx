import React, { useEffect, useRef, memo } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import CarMarker from './CarMarker';
import cars from './carsdata'; 

const libraries = ['marker'];

const getMapOptions = () => {
  return {
    disableDefaultUI: true,
    zoomControl: true,
    mapTypeControl: true,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
    draggable: true, // Enable or disable map dragging
    scrollwheel: true, // Enable or disable scrollwheel zoom
    disableDoubleClickZoom: false, // Enable or disable double click zoom
    minZoom: 10, // Minimum zoom level
    maxZoom: 20, // Maximum zoom level
    clickableIcons: false, // Disable all labels icons except custom infowindow
  };
};


const MapComponent = memo(({ center, zoom }) => {
  const mapRef = useRef(null);
  const language = 'iw'; 

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyC8DxT2vSZIyutVKE4BcB66O2x4LHGLxq4',
    libraries,
    loading: 'async',
    language: language, 
  });

  const handleOrderClick = (car) => {
    // Open the order window with the car details
    // You can implement this functionality based on your requirements
    console.log('Order clicked for car:', car);
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      ref={mapRef}
      zoom={zoom}
      center={center}
      mapContainerStyle={{ height: '75vh', width: '100%' }}
      options={getMapOptions()}
    >
      {cars.map((car) => (
        <CarMarker
          key={car.id}
          car={car}
          position={{ lat: car.coordinates.lat, lng: car.coordinates.lng }}
          // userLocation={{ lat: center.lat, lng: center.lng }}
          userLocation={center}
          handleOrderClick={handleOrderClick}
          
        />
      ))}
    </GoogleMap>
  );
});

export default MapComponent;
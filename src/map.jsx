import React, { useEffect, useRef, memo, useState } from 'react';
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import './style.css';
import cars from './data/carsData';
import dayMapStyles from './components/design/dayMapStyles';
import nightMapStyles from './components/design/nightMapStyles';
import SideNavigation from './components/sideNavigation';
import ListCars from './components/listCars';
import { LocationButton, UserLocation } from './components/userLocation';
import CarInfoWindow from './components/infoWindow'; 


const Map = () => {

  const [selectedCar, setSelectedCar] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 31.795729, lng: 35.219848 });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(true);

  const handleMarkerClick = (car) => {
    setSelectedCar(car);
    setIsInfoWindowOpen(true);
  };

  const handleCarClick = (car) => {
    setSelectedCar(car);
    setIsInfoWindowOpen(true);
  };

  const handleCloseClick = () => {
    setIsInfoWindowOpen(false);
  };


  const getMapOptions = () => {
    return {
      disableDefaultUI: true,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      draggable: true,
      scrollwheel: true,
      disableDoubleClickZoom: false,
      minZoom: 10,
      maxZoom: 20,
      clickableIcons: false,
      styles: isDarkMode ? nightMapStyles : dayMapStyles,
    };
  };

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyC8DxT2vSZIyutVKE4BcB66O2x4LHGLxq4',
    // googleMapsApiKey: process.env.APP_GOOGLE_MAPS_API_KEY,
    // libraries: ["places"],
    language: 'iw',
  });

  if (loadError) 
    return <div className='offline'>
      <b>your'e currently offline.</b> 
      <h4>please check your internet connections</h4>  
    </div>;
  if (!isLoaded) return <div>Loading map...</div>;

  const handleLocationButtonClick = () => {
    // Request user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setMapCenter({ lat: latitude, lng: longitude });
        setUserLocation({ lat: latitude, lng: longitude }); // Set user's location
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  };

  return (
    <div className='map-app'>
      <GoogleMap
        zoom={18}
        center={mapCenter}
        mapContainerStyle={{ height: '100%', width: '100%' }}
        options={getMapOptions()}
      >
        {userLocation && (
          <Marker
            position={userLocation}
            center={userLocation}
          />
        )}
        

          <div className="side-nav-bt" >
            <SideNavigation/>
          </div>
{/* 
          <div className="list-cars-bt son-map-bt" >
            <ListCars/>
          </div> */}

          <div className="location-button" onClick={handleLocationButtonClick}>
            <LocationButton/>
          </div>

        
        {/* <div className="toggle-track toggle-Theme">
          <ThemeToggle toggleTheme={toggleTheme} />
        </div> */}

        {cars.map((car) => (
          <Marker
            key={car.id}
            position={{ lat: car.coordinates.lat, lng: car.coordinates.lng }}
            onClick={() => handleMarkerClick(car)}
            icon={{
              url: 'images/car-side-solid.svg',
              scaledSize: new window.google.maps.Size(25, 25),
            }}
          />
        ))}

        {/* {selectedCar && (
          <InfoWindow
            position={{ lat: selectedCar.coordinates.lat, lng: selectedCar.coordinates.lng }}
            onCloseClick={() => setSelectedCar(null)}
          >
            <CarInfoWindow 
              selectedCar={selectedCar} 
              toggleTheme={toggleTheme} 
              userLocation={userLocation}

            />
          </InfoWindow>
        )} */}

      {(selectedCar && isInfoWindowOpen ) && (
        <CarInfoWindow
          selectedCar={selectedCar}
          userLocation={userLocation}
          onCloseClick={handleCloseClick}
        />
      )}

      </GoogleMap>
    </div>
  );
};

export default Map;

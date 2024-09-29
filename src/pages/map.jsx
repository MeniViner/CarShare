import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

import { fetchCarsFromFirebase } from '../data/fetchCars';
import CarInfoWindow from '../components/infoWindow'; 
import LoadingPage from '../assets/LoadingPage';
import withOfflineOverlay from '../assets/withOfflineOverlay';
import dayMapStyles from '../assets/dayMapStyles';
import nightMapStyles from '../assets/nightMapStyles';

import { IoListSharp } from 'react-icons/io5';
import { TbCurrentLocation } from "react-icons/tb";
import '../styles/map.css';


// import miniCarIcon from '../images/mini-car.svg';
// import familyCarIcon from '../images/family-car-icon.svg';
// import businessCarIcon from '../images/business-car-icon.svg';
// import suvCarIcon from '../images/suv-car-icon.svg';
import movingCar from '../images/moving-car.gif';

const CARS_CACHE_KEY = 'cachedCars';
const USER_LOCATION_KEY = 'userLocation';

const Map = () => {
  const location = useLocation();
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 31.795729, lng: 35.219848 });
  const [zoomLevel, setZoomLevel] = useState(16); 
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(true);
  const [isLocationSet, setIsLocationSet] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    language: 'iw',
  });

  const fetchCars = useCallback(async () => {
    try {
      const cachedCars = localStorage.getItem(CARS_CACHE_KEY);
      if (cachedCars) {
        setCars(JSON.parse(cachedCars));
        setIsLoading(false);
        return;
      }

      const fetchedCars = await fetchCarsFromFirebase();
      setCars(fetchedCars);
      localStorage.setItem(CARS_CACHE_KEY, JSON.stringify(fetchedCars));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching cars:", error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCars();

    const storedLocation = localStorage.getItem(USER_LOCATION_KEY);
    if (storedLocation) {
      const parsedLocation = JSON.parse(storedLocation);
      setUserLocation(parsedLocation);
      setMapCenter(parsedLocation);
      setIsLocationSet(true);
    }
  }, [fetchCars]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const carId = searchParams.get('carId');
    if (carId) {
      const car = cars.find(c => c.id === carId);
      if (car) {
        setSelectedCar(car);
        setMapCenter(car.coordinates);
        setIsInfoWindowOpen(true);
      }
    }
  }, [location, cars]);

  const handleMarkerClick = useCallback((car) => {
    setSelectedCar(car);
    setMapCenter({ lat: car.coordinates.lat, lng: car.coordinates.lng }); 
    setZoomLevel(14); 
    setTimeout(() => {
      setZoomLevel(17); 
    }, 150);
    setIsInfoWindowOpen(true);  
  }, []);

  const handleCloseClick = useCallback(() => {
    setIsInfoWindowOpen(false);
  }, []);

  const getMapOptions = useCallback(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDarkMode = savedTheme ? savedTheme === 'dark' : false;
    
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
      disableDoubleClickZoom: true,
      minZoom: 9,
      maxZoom: 20,
      clickableIcons: false,
      styles: isDarkMode ? nightMapStyles : dayMapStyles,
    };
  }, []);

  const getCarIcon = useCallback((category) => {
    switch (category) {
      // case 'mini':
      //   return miniCarIcon;
      // case 'family':
      //   return familyCarIcon;
      // case 'business':
      //   return businessCarIcon;
      // case 'SUV':
      //   return suvCarIcon;
      default:
        // return '../images/car-side-solid.svg';
        return movingCar;
    }
  }, []);

  const handleLocationButtonClick = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newLocation = { lat: latitude, lng: longitude };
        setMapCenter(newLocation);
        setUserLocation(newLocation);
        localStorage.setItem(USER_LOCATION_KEY, JSON.stringify(newLocation));
        setIsLocationSet(true);
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  }, []);

  const renderMarkers = useMemo(() => {
    if (!isLoaded) return null;
    return cars.map((car) => {
      const icon = getCarIcon(car.category);
      return (
        <Marker
          key={car.id}
          position={{ lat: car.coordinates.lat, lng: car.coordinates.lng }}
          onClick={() => handleMarkerClick(car)}
          title={car.name}
          icon={{
            url: icon,
            scaledSize: new window.google.maps.Size(35, 35),
          }}
        />
      );
    });
  }, [cars, getCarIcon, handleMarkerClick, isLoaded]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded || isLoading) return <LoadingPage />;

  return (
    <div className='map-app'>
      <GoogleMap
        zoom={zoomLevel}
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

        <div className='location-button' onClick={handleLocationButtonClick}>
          <div className={`fa-location ${isLocationSet ? 'blue' : ''}`}>
            <TbCurrentLocation />
          </div>
        </div>

        <Link to="/car-list">
          <div className='car-list-map fa-location'>
            <IoListSharp />
          </div>
        </Link> 

        {renderMarkers}

        {(selectedCar && isInfoWindowOpen) && (
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

export default withOfflineOverlay(Map);

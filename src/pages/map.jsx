import React, {useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

import cars from '../data/carsData';
import dayMapStyles from '../assets/dayMapStyles';
// import DayMapStyles from './assets/dayMapStyles';
import nightMapStyles from '../assets/nightMapStyles';
import { TbCurrentLocation } from "react-icons/tb";
import CarInfoWindow from '../components/infoWindow'; 
import LoadingPage from '../assets/LoadingPage';
import withOfflineOverlay from '../assets/withOfflineOverlay';
import '../styles/map.css';


const Map = () => {
  const location = useLocation(); 
  const [selectedCar, setSelectedCar] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 31.795729, lng: 35.219848 });
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(true);
  // const [isDarkMode, setIsDarkMode] = useState(() => {
  const isDarkMode = useState(() => {
    // טען את מצב הנושא מ-localStorage אם קיים
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });
  const [isLocationSet, setIsLocationSet] = useState(false); // ניהול מצב האם מיקום שמור

  useEffect(() => {
    const storedLocation = localStorage.getItem('userLocation');
    if (storedLocation) {
      const parsedLocation = JSON.parse(storedLocation);
      setUserLocation(parsedLocation);
      setMapCenter(parsedLocation);
      setIsLocationSet(true); // עדכון המצב אם יש מיקום שמור
    }


    // בדוק אם יש פרמטר carId ב-URL
    const searchParams = new URLSearchParams(location.search);
    const carId = searchParams.get('carId');
    if (carId) {
      const car = cars.find(c => c.id === parseInt(carId));
      if (car) {
        setSelectedCar(car);
        setMapCenter(car.coordinates); // התרכז ברכב שנבחר
        setIsInfoWindowOpen(true); // פתח את ה-infoWindow
      }
    }

  }, [location]); // הפעל מחדש כש-location משתנה


  

  const handleMarkerClick = (car) => {
    setSelectedCar(car);
    setIsInfoWindowOpen(true);
  };

  // const handleCarClick = (car) => {
  //   setSelectedCar(car);
  //   setIsInfoWindowOpen(true);
  // };

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
      disableDoubleClickZoom: true,
      minZoom: 10,
      maxZoom: 20,
      clickableIcons: false,
      styles: isDarkMode ? nightMapStyles : dayMapStyles,
    };
  };



  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    // libraries: ["places"],
    language: 'iw',
  });


  if (!isLoaded) return <LoadingPage />;


  const handleLocationButtonClick = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newLocation = { lat: latitude, lng: longitude }; // ערך חדש למיקום המשתמש
        setMapCenter(newLocation);
        setUserLocation(newLocation);
        localStorage.setItem('userLocation', JSON.stringify(newLocation)); // שמור ב-localStorage
        setIsLocationSet(true); // עדכון המצב אם המיקום נשמר
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  };


  return (
    <div className='map-app'>
      <GoogleMap
        zoom={16}
        center={mapCenter}
        mapContainerStyle={{ height: '100%', width: '100%' }}
        options={getMapOptions()}
      >
        {userLocation && (
          <Marker //window.google.maps.marker.AdvancedMarkerElement
            position={userLocation}
            center={userLocation}
          />
        )}

          {/* <div className="side-nav-bt" >
            <SideNavigation/>
          </div> */}

          <div className='location-button' onClick={handleLocationButtonClick}>
            <div className={`fa-location ${isLocationSet ? 'blue' : ''}`}>
              <TbCurrentLocation />
            </div>
          </div>

        {cars.map((car) => (
          <Marker //window.google.maps.marker.AdvancedMarkerElement
            key={car.id}
            position={{ lat: car.coordinates.lat, lng: car.coordinates.lng }}
            onClick={() => handleMarkerClick(car)}
            icon={{
              url: 'images/car-side-solid.svg',
              scaledSize: new window.google.maps.Size(25, 25),
            }}
          />
        ))}

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

export default withOfflineOverlay(Map);
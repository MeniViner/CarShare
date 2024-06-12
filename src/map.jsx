import React, {useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import './style.css';
import cars from './data/carsData';
import dayMapStyles from './components/design/dayMapStyles';
import nightMapStyles from './components/design/nightMapStyles';
import SideNavigation from './components/sideNavigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocation } from '@fortawesome/free-solid-svg-icons';
import CarInfoWindow from './components/infoWindow'; 
import LoadingPage from './assets/LoadingPage';
import withOfflineOverlay from './assets/withOfflineOverlay';


const Map = () => {

  const [selectedCar, setSelectedCar] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 31.795729, lng: 35.219848 });
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // טען את מצב הנושא מ-localStorage אם קיים
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });

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

  // const toggleTheme = () => {
  //   setIsDarkMode(prevMode => !prevMode);
  // };
  const toggleTheme = (isDark) => {
    setIsDarkMode(isDark);
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyC8DxT2vSZIyutVKE4BcB66O2x4LHGLxq4',
    // googleMapsApiKey: process.env.APP_GOOGLE_MAPS_API_KEY,
    // libraries: ["places"],
    language: 'iw',
  });

  // if (loadError) 
  //   return <OfflinePage />;
  if (!isLoaded)
    return <LoadingPage />;


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

          <div className="location-button" onClick={handleLocationButtonClick}>
            <div className='location-button'>
              <div className='fa-location'> {/*onClick={handleLocationButtonClick}*/}
                <FontAwesomeIcon icon={faLocation} />
              </div>
            </div>
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

export default withOfflineOverlay(Map);

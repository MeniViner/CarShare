import React, { useEffect, useRef, memo, useState } from 'react';
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import haversine from 'haversine-distance';
import UserLocation from '../components/userLocation';
import UserLocationBt from '../components/userLocationBt';
import ThemeToggle from '../components/design/themeToggle';
import '../style.css';
import cars from '../data/carsData';
import dayMapStyles from './design/dayMapStyles';
import nightMapStyles from './design/nightMapStyles';
import SideNavigation from '../components/sideNavigation';
import ListCars from '../components/listCars';


const Map = () => {

  const [selectedCar, setSelectedCar] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 31.795729, lng: 35.219848 });
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchUserLocation = async () => {
      const location = <UserLocation />;
      // const location = await UserLocation.fetchLocation()
      setUserLocation(location);
    };

    fetchUserLocation();
  }, []);

  const handleLocationButtonClick = () => {
    if (userLocation) {
      setMapCenter({ lat: userLocation.lat, lng: userLocation.lng });
    }
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

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div >
      <GoogleMap
        zoom={18}
        center={mapCenter}
        mapContainerStyle={{ height: '100vh', width: '100%' }}
        options={getMapOptions()}
      >
        {userLocation && (
          <Marker
            position={{ lat: userLocation.lat, lng: userLocation.lng }}
            center={{ lat: userLocation.lat, lng: userLocation.lng }}
          />
        )}

        <div className="location-button" onClick={handleLocationButtonClick}>
          <UserLocationBt />
        </div>

        <div className="side-nav-bt" >
          <SideNavigation />
        </div>

        <div className="list-cars-bt" >
          <ListCars />
        </div>

        {/* <div className="toggle-track toggle-Theme">
          <ThemeToggle toggleTheme={toggleTheme} />
        </div> */}

        {cars.map((car) => (
          <Marker
            key={car.id}
            position={{ lat: car.coordinates.lat, lng: car.coordinates.lng }}
            onClick={() => setSelectedCar(car)}
            icon={{
              url: 'car-side-solid.svg',
              scaledSize: new window.google.maps.Size(25, 20),
            }}
          />
        ))}

        {selectedCar && (
          <InfoWindow
            position={{ lat: selectedCar.coordinates.lat, lng: selectedCar.coordinates.lng }}
            onCloseClick={() => setSelectedCar(null)}
          >
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
              <ThemeToggle toggleTheme={toggleTheme} />
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default Map;

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsStaggered, faCog, faLocationCrosshairs, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import useGeoLocation from './userLocation';
import MapComponent from './Map';
import OrderWindow from './OrderWindow/';
import './style.css';

function App() {
  
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const openSideNav = () => setIsSideNavOpen(true);
  const closeSideNav = () => setIsSideNavOpen(false);


  const { location, getLocation } = useGeoLocation();
  const [center, setCenter] = useState({ lat: 31.795729, lng: 35.219848 });

  const isValidLocation = location.loaded && location.coordinates.lat && location.coordinates.lng;

  const handleLocationClick = () => {
    getLocation();
    if (isValidLocation) {
      setCenter(location.coordinates);
    }
  };

  const [isOrderWindowOpen, setIsOrderWindowOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const handleOrderClick = (car) => {
    setSelectedCar(car);
    setIsOrderWindowOpen(true);
  };

  const handleCloseOrderWindow = () => {
    setIsOrderWindowOpen(false);
    setSelectedCar(null);
  };

  return (
    <div className="app">

      <div className={`sidenav ${isSideNavOpen ? 'open' : ''}`}>
        Side Navigation Content
        <br/>
        1
        <br/>
        2
        <br/>
        carShare 0.0.0.2
      </div>

      <div className="top">
        <div className="left-icon icon bt" onClick={openSideNav}>
          <FontAwesomeIcon icon={faBarsStaggered} />
        </div>
        <div className="right-icon icon bt">
          <FontAwesomeIcon icon={faCog} />
        </div>
      </div>

      {isSideNavOpen && <div className="overlay" onClick={closeSideNav}></div>}
      
      <div className="map">
        <MapComponent 
          center={center} 
          zoom={15} 
          handleOrderClick={handleOrderClick}
        />
        <button id="location-bt" onClick={handleLocationClick}>
          <FontAwesomeIcon icon={faLocationCrosshairs} />
        </button>
      </div>

      {isOrderWindowOpen && (
        <OrderWindow
          car={selectedCar}
          handleClose={handleCloseOrderWindow}
          isOpen={isOrderWindowOpen}
        />
      )}

      <div className="bottom">

      </div>
    </div>
  );
}

export default App;
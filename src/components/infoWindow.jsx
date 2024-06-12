import React, { useState, useRef, useEffect } from 'react';
import ImageCarousel from '../assets/ImageCarousel';
import '../styles/infoWindow.css';

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGasPump, faCog } from '@fortawesome/free-solid-svg-icons';
import { BsFillFuelPumpFill } from "react-icons/bs";
import { GiPathDistance } from "react-icons/gi";
import { PiSeatFill } from "react-icons/pi";
import { MdAirlineSeatReclineExtra, MdLocationOff } from "react-icons/md";
import { calculateDistance } from '../utils/distanceCalculator';

//animations
import { useSpring, animated } from '@react-spring/web'; //animation for slow open the more details


const CarInfoWindow = ({ selectedCar, onCloseClick, userLocation }) => {

  const distance = calculateDistance(userLocation, selectedCar.coordinates);

  const [showMore, setShowMore] = useState(false);
  const ref = useRef(null); 

  const carouselAnimation = useSpring({
    opacity: showMore ? 1 : 0,
    transform: showMore ? 'translateY(0)' : 'translateY(-20px)',
    config: { duration: 300 },
  });
  

  // הוסף useEffect לזיהוי לחיצה מחוץ לחלון
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onCloseClick(); 
      }
    };

    document.body.addEventListener('mousedown', handleClickOutside); 
    document.body.addEventListener('touchstart', handleClickOutside); 

    return () => {
      document.body.removeEventListener('mousedown', handleClickOutside); 
      document.body.removeEventListener('touchstart', handleClickOutside); 
    };
  }, [onCloseClick]); // הוסף useEffect עם התלות ב-onCloseClick

  return (
    <div ref={ref} className="vehicle-info"> {/* הוסף את ref ל-div הראשי */}
      <div className="vehicle-info-header">
        <div className="vehicle-info-header-text">
          <h1 class="sticky">{selectedCar.brand}</h1>
          <h1>{selectedCar.model}</h1>
        </div>
        
        
        <img
          src={selectedCar.image}
          alt={`${selectedCar.brand} ${selectedCar.model}`}
          className="vehicle-info-image"
        />
      </div>
      <div className="vehicle-info-details">
          { (distance) ? ( //ask if ther is a distance set
            <div>
              <GiPathDistance />
              <span>{distance}</span>
            </div>
          ) : ( 
            <div>
              <MdLocationOff />
            </div>
          )}

          {selectedCar.fuel !== 'NaN' && ( // הסתרה אם הערך fuel הוא 'NaN'
            <div>
              <FontAwesomeIcon icon={faGasPump} />
              <span>{selectedCar.fuel}</span>
            </div>
          )}
          {selectedCar.battery !== 'NaN' && ( // הסתרה אם הערך battery הוא 'NaN'
            <div>
              <BsFillFuelPumpFill />
              <span>{selectedCar.battery}</span>
            </div>
          )}
          <div>
          <PiSeatFill />
            <span>{selectedCar.seats}</span>
          </div>
        </div>
      <button onClick={() => setShowMore(!showMore)} className="show-more-button">more details</button>
      {showMore && (
        <animated.div style={carouselAnimation} className="carousel">
          <ImageCarousel images={[selectedCar.image, selectedCar.image1, selectedCar.image2, selectedCar.image3, selectedCar.image4, selectedCar.image5]} />
        </animated.div>
      )}
      <button className="close-button" onClick={onCloseClick}>Close</button>
    </div>
  );
};

export default CarInfoWindow;

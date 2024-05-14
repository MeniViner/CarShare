// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
// import { mdiMapMarkerQuestionOutline, mdiCarSeat } from '@mdi/js';
// import Icon from '@mdi/react';

// import ThemeToggle from './design/themeToggle';
// import { calculateDistance } from '../utils/distanceCalculator';
// import '../styles/infoWindow.css'

// const CarInfoWindow = ({ selectedCar, toggleTheme, userLocation }) => {

//   const distance = calculateDistance(userLocation, selectedCar.coordinates);

//   return (
//     <div className="popup-window">
//       <img
//         src={selectedCar.image}
//         alt={`${selectedCar.brand} ${selectedCar.model}`}
//       />
//       <h2>{selectedCar.brand} {selectedCar.model}</h2>
//       <p>Category: {selectedCar.category}</p>
//       <p>Seats: {selectedCar.seats}</p>
//       <p>Year: {selectedCar.year}</p>
//       <p>Price per Hour: ${selectedCar.pricePerHour}</p>
//       <div className="location-info">
//         {distance ? (
//           <>
//             <span>Distance: {distance}</span>
//             <FontAwesomeIcon icon={faLocationArrow} />
//           </>
//         ) : (
//           <>
//             <span>No distance available</span>
//             <Icon path={mdiMapMarkerQuestionOutline} size={1} />
//           </>
//         )}
//       </div>
//       <ThemeToggle toggleTheme={toggleTheme} />
//     </div>
//   );
// };

// export default CarInfoWindow;





// import React, { useState, useRef, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
// import { mdiMapMarkerQuestionOutline } from '@mdi/js';
// import Icon from '@mdi/react';

// import ThemeToggle from './design/themeToggle';
// import { calculateDistance } from '../utils/distanceCalculator';
// import '../styles/infoWindow.css';

// const CarInfoWindow = ({ selectedCar, userLocation, onCloseClick }) => {
//   const distance = calculateDistance(userLocation, selectedCar.coordinates);
//   const [isDragging, setIsDragging] = useState(false);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const ref = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (ref.current && !ref.current.contains(event.target)) {
//         onCloseClick();
//       }
//     };

//     document.body.addEventListener('click', handleClickOutside);

//     return () => {
//       document.body.removeEventListener('click', handleClickOutside);
//     };
//   }, [onCloseClick]);
  
//   // const handleMouseDown = (e) => {
//   //   setIsDragging(true);
//   //   setPosition({
//   //     x: e.clientX - ref.current.getBoundingClientRect().left,
//   //     y: e.clientY - ref.current.getBoundingClientRect().top,
//   //   });
//   // };

//   // const handleMouseMove = (e) => {
//   //   if (isDragging) {
//   //     const newX = e.clientX - position.x;
//   //     const newY = e.clientY - position.y;
//   //     setPosition({ x: newX, y: newY });
//   //   }
//   // };

//   // const handleMouseUp = () => {
//   //   setIsDragging(false);
//   // };

//   return (
//     <div
//       className="popup-window"
//       // className={`popup-window ${isDragging ? 'dragging' : ''}`}
//       // ref={ref}
//       // style={{ left: position.x, top: position.y }}
//       // onMouseDown={handleMouseDown}
//       // onMouseMove={handleMouseMove}
//       // onMouseUp={handleMouseUp}
//     >
//       <img src={selectedCar.image} alt={`${selectedCar.brand} ${selectedCar.model}`} />

//       <div className="info-content">
//         <h2>{selectedCar.brand} {selectedCar.model}</h2>
//         <p>Category: {selectedCar.category}</p>
//         <p>Seats: {selectedCar.seats}</p>
//         <p>Year: {selectedCar.year}</p>
//         <p>Price per Hour: ${selectedCar.pricePerHour}</p>
//         <div className="location-info">
//           {distance ? (
//             <>
//               <span>Distance: {distance}</span>
//               <FontAwesomeIcon icon={faLocationArrow} />
//             </>
//           ) : (
//             <>
//               <span>No distance available</span>
//               <Icon path={mdiMapMarkerQuestionOutline} size={1} />
//             </>
//           )}
//         </div>
//       </div>
//       <button className="close-button" onClick={onCloseClick}>Close</button>
//       <ThemeToggle />
//     </div>
//   );
// };

// export default CarInfoWindow;











import React, { useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGasPump, faCog } from '@fortawesome/free-solid-svg-icons';
import { mdiMapMarkerQuestionOutline, mdiCarSeat } from '@mdi/js';
import Icon from '@mdi/react';
import '../styles/infoWindow.css'


const CarInfoWindow = ({ selectedCar, userLocation, onCloseClick  }) => {
  const ref = useRef(null);

  useEffect(() => {
      const handleClickOutside = (event) => {
          if (ref.current && !ref.current.contains(event.target)) {
              onCloseClick();
          }
      };

      document.body.addEventListener('mousedown', handleClickOutside);

      return () => {
          document.body.removeEventListener('mousedown', handleClickOutside);
      };
  }, [onCloseClick]);
  
  // const distance = calculateDistance(userLocation, selectedCar.coordinates);

  return (
    <div ref={ref} >
      <div className="vehicle-info">
        <div className="vehicle-info-header">
          <div className="vehicle-info-header-text">
            <h2>{selectedCar.brand}</h2>
            <h3>{selectedCar.model}</h3>
          </div>
          <img
            src={selectedCar.image}
            alt={`${selectedCar.brand} ${selectedCar.model}`}
            className="vehicle-info-image"
          />
        </div>
        <div className="vehicle-info-details">
          <div>
            <FontAwesomeIcon icon={faCog} />
            <span>{selectedCar.transmission}</span>
          </div>
          <div>
            <FontAwesomeIcon icon={faGasPump} />
            <span>{selectedCar.fuel}</span>
          </div>
          <div>
            <Icon path={mdiCarSeat} size={1} />
            <span>{selectedCar.seats} seats</span>
          </div>
        </div>
        <div className="vehicle-info-rate">
          <p>Standard rate (km)</p>
          <p>{selectedCar.ratePerKm} {selectedCar.pricePerHour}€/km</p>
        </div>
        {/* <div className="vehicle-info-rate">
          <p>Unlock Fee</p>
          <p>{selectedCar.unlockFee}€</p>
        </div>
        <div className="vehicle-info-rate">
          <p>Parking minutes</p>
          <p>{selectedCar.parkingMinutesRate}€</p>
        </div>
        <div className="vehicle-info-rate">
          <p>Fuel</p>
          <p>Free refueling at our partner gas stations</p>
        </div> */}
        <div className="vehicle-info-footer">
          <p>66km (12%)</p>
          <button>Reserve now</button>
        </div>
        <button className="close-button" onClick={onCloseClick}>Close</button>
      </div>
    </div>
  );
};

export default CarInfoWindow;
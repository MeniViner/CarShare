// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLocation } from '@fortawesome/free-solid-svg-icons';

// // Button component
// const LocationButton = ({ onClick }) => {
//   return (
//     <div className='location-button'>
//       <button onClick={onClick} className='faLocation'>
//         <FontAwesomeIcon icon={faLocation} />
//       </button>
//     </div>
//   );
// };

// // User location component
// const UserLocation = () => {
//   const [userLocation, setUserLocation] = useState(null);

//   if (!navigator.geolocation) {
//     return null; // Geolocation not supported, return null
//   }

//   // Getting user's current position
//   navigator.geolocation.getCurrentPosition(
//     (position) => {
//       setUserLocation({
//         lat: position.coords.latitude,
//         lng: position.coords.longitude,
//       });
      
//     },
//     () => {
//       setUserLocation(null);
//     }
//   );

//   if (!userLocation) return null;

//   return {
//     lat: userLocation.lat,
//     lng: userLocation.lng,
//   };
// };

// // Export both components
// export { LocationButton, UserLocation };


// import React, { useState, useEffect } from 'react';

// const UserLocation = () => {
//   const [location, setLocation] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const handleSuccess = (position) => {
//       const { latitude, longitude } = position.coords;
//       setLocation({ lat: latitude, lng: longitude });
//     };

//     const handleError = (error) => {
//       setError(error.message);
//     };

//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
//     } else {
//       setError('Geolocation is not supported by this browser.');
//     }
//   }, []);

//   return location; 
// };

// export default UserLocation;



import React, { useState, useEffect } from 'react';

function UserLocation() {
  const [position, setPosition] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

  return position;
}

export default UserLocation;
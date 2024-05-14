import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocation } from '@fortawesome/free-solid-svg-icons';

const LocationButton = ({onClick}) => {
  return (
    <div className='location-button'>
      <div onClick={onClick} className='fa-location'>
        <FontAwesomeIcon icon={faLocation} />
      </div>
    </div>
  );
};

const UserLocation = ({ onUserLocationChange }) => {
  const handleLocationButtonClick = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onUserLocationChange({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  };
  return (
    <LocationButton onClick={handleLocationButtonClick} />
  );
};
export { LocationButton, UserLocation };



// import React, { useEffect, useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLocation } from '@fortawesome/free-solid-svg-icons';

// const LocationButton = ({ onClick }) => {
//   return (
//     <div className='location-button'>
//       <button onClick={onClick} className='fa-location'>
//         <FontAwesomeIcon icon={faLocation} />
//       </button>
//     </div>
//   );
// };

// const UserLocation = ({ onUserLocationChange }) => {
//   const [userPermission, setUserPermission] = useState(null);

//   useEffect(() => {
//     // Request permission to access user's location on mobile devices
//     if (navigator.permissions && navigator.permissions.query) {
//       navigator.permissions
//         .query({ name: 'geolocation' })
//         .then((permissionStatus) => {
//           setUserPermission(permissionStatus.state);
//           permissionStatus.onchange = () => {
//             setUserPermission(permissionStatus.state);
//           };
//         });
//     }
//   }, []);

//   const handleLocationButtonClick = () => {
//     if (userPermission === 'granted') {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           onUserLocationChange({ lat: latitude, lng: longitude });
//         },
//         (error) => {
//           console.error('Error getting user location:', error);
//         }
//       );
//     } else if (userPermission === 'denied') {
//       console.log('Location permission denied');
//     } else {
//       console.log('Requesting location permission...');
//       navigator.permissions
//         .request({ name: 'geolocation' })
//         .then((permissionStatus) => {
//           setUserPermission(permissionStatus.state);
//           permissionStatus.onchange = () => {
//             setUserPermission(permissionStatus.state);
//           };
//         });
//     }
//   };

//   return <LocationButton onClick={handleLocationButtonClick} />;
// };

// export { LocationButton, UserLocation };
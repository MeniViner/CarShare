// // utils/distanceCalculator.js
// import haversine from 'haversine-distance';

// export const calculateDistance = (userLocation, carLocation) => {
//     if (!userLocation) return null; 
//     const distanceInMeters = haversine([userLocation.lat, userLocation.lng], [carLocation.lat, carLocation.lng]);
//     const distance = distanceInMeters > 1000 ? (distanceInMeters / 1000).toFixed(0) + " km" : distanceInMeters.toFixed(0) + " meter";
//     return distance;
// };

import haversine from 'haversine-distance';

export const calculateDistance = (userLocation, carLocation) => {
    if (!userLocation) return null;
    const distanceInMeters = haversine([userLocation.lat, userLocation.lng], [carLocation.lat, carLocation.lng]);
    return distanceInMeters.toFixed(0); // Return numeric value in meters
};

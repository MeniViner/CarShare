// utils/distanceCalculator.js
import haversine from 'haversine-distance';

export const calculateDistance = (userLocation, carLocation) => {
    if (!userLocation) return null; 
    const distanceInMeters = haversine([userLocation.lat, userLocation.lng], [carLocation.lat, carLocation.lng]);
    const distance = distanceInMeters > 1000 ? (distanceInMeters / 1000).toFixed(1) + " km" : distanceInMeters.toFixed(2) + " meter";
    return distance;
};

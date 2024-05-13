// userLocation.jsx
import React, { useState, useCallback } from 'react';

const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: '', lng: '' },
  });

  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude, 
        lng: location.coords.longitude, 
      },
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error,
    });
  };

  const getLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
      onError({
        code: 0,
        message: 'Geolocation not supported',
      });
    }
  }, []);

  return { location, getLocation };
};

export default useGeoLocation;
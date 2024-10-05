import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Autocomplete } from '@react-google-maps/api';

import dayMapStyles from '../assets/dayMapStyles';
import nightMapStyles from '../assets/nightMapStyles';
import '../styles/LocationPicker.css'


const mapContainerStyle = {
  width: '100%',
  height: '300px'
};

const center = {
  lat: 31.7683,
  lng: 35.2137
};

const libraries = ["places"];

export default function LocationPicker({ isOpen, onClose, onLocationPicked }) {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [address, setAddress] = useState('');

  const onMapClick = useCallback((e) => {
    setMarker({
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    });
    reverseGeocode(e.latLng);
  }, []);

  const handleConfirm = useCallback(() => {
    if (marker) {
      onLocationPicked({
        address: address,
        lat: marker.lat,
        lng: marker.lng
      });
      onClose();
    }
  }, [marker, address, onLocationPicked, onClose]);

  const onLoad = useCallback((autocomplete) => {
    setAutocomplete(autocomplete);
  }, []);

  const onPlaceChanged = useCallback(() => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const newMarker = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };
        setMarker(newMarker);
        setAddress(place.formatted_address);
        map.panTo(newMarker);
        map.setZoom(15);
      }
    }
  }, [autocomplete, map]);

  const reverseGeocode = useCallback((latLng) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          setAddress(results[0].formatted_address);
        }
      }
    });
  }, []);

  const handleGetMyLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setMarker(pos);
          map.panTo(pos);
          map.setZoom(15);
          reverseGeocode(pos);
        },
        () => {
          console.error('Error: The Geolocation service failed.');
        }
      );
    } else {
      console.error('Error: Your browser doesn\'t support geolocation.');
    }
  }, [map, reverseGeocode]);

  const getMapOptions = useCallback(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDarkMode = savedTheme ? savedTheme === 'dark' : false;
    
    return {
      disableDefaultUI: true,
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      draggable: true,
      scrollwheel: true,
      disableDoubleClickZoom: false,
      minZoom: 3,
      maxZoom: 20,
      clickableIcons: false,
      styles: isDarkMode ? nightMapStyles : dayMapStyles,
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="location-picker-overlay">
      <div className="location-picker-modal">
        <h2>Pick a Location</h2>
        <LoadScript 
          googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
          libraries={libraries}
        >
          <div className="search-box">
            <Autocomplete
              onLoad={onLoad}
              onPlaceChanged={onPlaceChanged}
            >
              <input
                type="text"
                placeholder="Search for a location"
                className="search-input"
              />
            </Autocomplete>
          </div>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={10}
            onClick={onMapClick}
            onLoad={setMap}
            options={getMapOptions()}
          >
            {marker && <Marker position={marker} />}
          </GoogleMap>
        </LoadScript>
        <div className="address-input">
          <label htmlFor="address">Address</label>
          <input 
            id="address" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
            readOnly
          />
        </div>
        <div className="button-group">
          <button onClick={handleGetMyLocation} className="get-location-btn">🧭 Get My Location</button>
          <button onClick={handleConfirm} className="confirm-btn">✔️ Confirm Location</button>
          <button onClick={onClose} className="cancel-btn">✖️ Cancel</button>
        </div>
      </div>
    </div>
  );
}

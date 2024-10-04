import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import '../'

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
  const [searchBox, setSearchBox] = useState(null);
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

  const handleSearchBoxLoad = useCallback((ref) => {
    setSearchBox(ref);
  }, []);

  const handlePlacesChanged = useCallback(() => {
    const places = searchBox.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      const newMarker = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
      setMarker(newMarker);
      setAddress(place.formatted_address);
      map.panTo(newMarker);
    }
  }, [searchBox, map]);

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
            <input
              type="text"
              placeholder="Search for a location"
              onLoad={handleSearchBoxLoad}
              onChange={handlePlacesChanged}
            />
          </div>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={10}
            onClick={onMapClick}
            onLoad={setMap}
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
          />
        </div>
        <div className="button-group">
          <button onClick={handleGetMyLocation}>Get My Location</button>
          <button onClick={handleConfirm}>Confirm Location</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

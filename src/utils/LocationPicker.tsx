import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const mapContainerStyle = {
  width: '100%',
  height: '300px'
};

const center = {
  lat: 31.7683,
  lng: 35.2137
};

interface LocationPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationPicked: (location: { city: string; street: string; lat: number; lng: number }) => void;
}

export default function LocationPicker({ isOpen, onClose, onLocationPicked }: LocationPickerProps) {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');

  const onMapClick = useCallback((e) => {
    setMarker({
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    });
  }, []);

  const handleConfirm = useCallback(() => {
    if (marker) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: marker }, (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            const addressComponents = results[0].address_components;
            const cityComponent = addressComponents.find(component => component.types.includes('locality'));
            const streetComponent = addressComponents.find(component => component.types.includes('route'));
            
            onLocationPicked({
              city: cityComponent ? cityComponent.long_name : '',
              street: streetComponent ? streetComponent.long_name : '',
              lat: marker.lat,
              lng: marker.lng
            });
            onClose();
          }
        }
      });
    }
  }, [marker, onLocationPicked, onClose]);

  const handleManualEntry = useCallback(() => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: `${street}, ${city}` }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          const { lat, lng } = results[0].geometry.location;
          setMarker({ lat: lat(), lng: lng() });
          map.panTo({ lat: lat(), lng: lng() });
        }
      }
    });
  }, [city, street, map]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Pick a Location</DialogTitle>
        </DialogHeader>
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
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
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="city" className="text-right">
              City
            </Label>
            <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="street" className="text-right">
              Street
            </Label>
            <Input id="street" value={street} onChange={(e) => setStreet(e.target.value)} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleManualEntry}>
            Find Address
          </Button>
          <Button type="button" onClick={handleConfirm}>
            Confirm Location
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

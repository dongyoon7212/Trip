import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
// import classes from './MapAPI.module.css'

const MapAPI = ({ country }) => {
  const [markerPosition, setMarkerPosition] = useState(null);

  useEffect(() => {
    if (window.google && window.google.maps) {
      // Google Maps API가 로드된 상태에서 실행되어야 하는 코드
      if (country) {
        const geocoder = new window.google.maps.Geocoder();

        geocoder.geocode({ address: country }, (results, status) => {
          if (status === window.google.maps.GeocoderStatus.OK) {
            const { lat, lng } = results[0].geometry.location;
            setMarkerPosition({ lat: lat(), lng: lng() });
          }
        });
      }
    }
  }, [country]);

  const mapStyles = {
    height: "500px",
    width: "800px",
  };

  return (
    <div>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={4}
          center={markerPosition}
        >
          {markerPosition && <Marker position={markerPosition} />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapAPI;

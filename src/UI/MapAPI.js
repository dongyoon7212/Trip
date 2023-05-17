import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

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
    height: "400px",
    width: "100%",
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyB4FbtTm4UMYuvF8NyyE1FaCaiNK2IpbaQ">
      <GoogleMap mapContainerStyle={mapStyles} zoom={5} center={markerPosition}>
        {markerPosition && <Marker position={markerPosition} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapAPI;

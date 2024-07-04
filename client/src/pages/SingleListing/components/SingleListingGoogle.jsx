import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_API_GOOGLE_MAPS_API_KEY;

const containerStyle = {
  width: "100%",
  maxWidth: "700px",
  height: "500px",
  borderRadius: "1rem",
};

function SingleListingGoogle({ onLocationSelect, initialLocation }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);

  const onLoad = useCallback(
    function callback(map) {
      const initialMarkerPosition = initialLocation || null;

      if (initialMarkerPosition) {
        setMarkerPosition(initialMarkerPosition);
        onLocationSelect(initialMarkerPosition);
      }
      setMap(map);
    },
    [onLocationSelect, initialLocation]
  );

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  useEffect(() => {
    if (map && initialLocation) {
      setMarkerPosition(initialLocation);
      map.panTo(initialLocation); // center the map at the initial marker position
    }
  }, [map, initialLocation]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {markerPosition && <Marker position={markerPosition} />}
    </GoogleMap>
  ) : null;
}

export default SingleListingGoogle;

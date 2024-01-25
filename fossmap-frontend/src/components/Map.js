import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

function MapComponent() {
  const mapRef = useRef(null);

  useEffect(() => {
    mapRef.current = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(mapRef.current);
  }, []);

  return <div id="map"></div>;
}

export default MapComponent;

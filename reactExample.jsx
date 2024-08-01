import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
    const mapRef = useRef(null);
    const [bounds] = useState(L.latLngBounds(L.latLng(36, 26), L.latLng(42, 45)));

    useEffect(() => {
        // Initialize the map
        mapRef.current = L.map('map', {
            dragging: false
        });

        // Fit the map to the rectangle bounds
        mapRef.current.fitBounds(bounds);

        // Add a tile layer (OpenStreetMap tiles)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapRef.current);

        // Adjust the map view on window resize
        const handleResize = () => {
            mapRef.current.fitBounds(bounds);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
            mapRef.current.remove();
        };
    }, [bounds]);

    return <div id="map" style={{ height: '100vh', width: '100%' }}></div>;
};

export default MapComponent;
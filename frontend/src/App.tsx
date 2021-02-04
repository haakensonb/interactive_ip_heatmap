import React from 'react';
import './App.css';

import { MapContainer, TileLayer } from 'react-leaflet'
import HeatmapContainer from './HeatmapContainer';

// --------------------
// Hack to make leaflet css work with React-Leaflet.
// See https://stackoverflow.com/questions/49441600/react-leaflet-marker-files-not-found
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;
// ----------------------


function App() {

  return (
    <div className="App">
      <MapContainer center={[39.791000, -86.148003]} zoom={12} scrollWheelZoom={false} preferCanvas={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <HeatmapContainer />

      </MapContainer>
    </div>
  );
}

export default App;

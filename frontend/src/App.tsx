import React from 'react';
import './App.css';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Heatmap from './Heatmap';

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
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>

        <Heatmap />

      </MapContainer>
    </div>
  );
}

export default App;

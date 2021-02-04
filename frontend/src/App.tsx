import React from 'react';
import './App.css';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
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
  // If I understand Mapbox correctly, this token is public and ok to use here.
  const my_token: string = "pk.eyJ1IjoiaGFha2Vuc29uYiIsImEiOiJja2trN3p5c2gxN2l1Mm9vZHQ3eWQxa3FoIn0.tT2wWv80-O0O1mCR69cBbg";

  return (
    <div className="App">
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} preferCanvas={true}>
        <TileLayer
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
          url='https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'
          id='mapbox/dark-v10'
          accessToken={my_token}
        />

        <HeatmapContainer />

      </MapContainer>
    </div>
  );
}

export default App;

import { SidebarData } from "./types";
import { useMap, useMapEvent } from "react-leaflet";
import { useState } from "react";

function Sidebar() {
    const map = useMap();

    const getSidebarData = (map: any): SidebarData => {
        return { "lat": map.getCenter().lat.toFixed(4), "lng": map.getCenter().lng.toFixed(4), "zoom": map.getZoom() }
    };

    const [sidebar, setSidebar] = useState(getSidebarData(map));

    useMapEvent('move', () => {
        setSidebar(getSidebarData(map));
    });

    return (
        <div className='sidebarStyle'>
            <div>
                Latitude: {sidebar.lat} | Longitude: {sidebar.lng} | Zoom: {sidebar.zoom}
            </div>
        </div>
    );
}

export default Sidebar;
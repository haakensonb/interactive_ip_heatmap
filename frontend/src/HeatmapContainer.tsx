import { LatLngBounds } from "leaflet";
import { useEffect, useState } from "react";
import { useMap, useMapEvent } from "react-leaflet";
import { urlBoundsFormat } from "./utils";
import Heatmap from "./Heatmap";
import useApi from "./useApi";
import Sidebar from "./Sidebar";
import "leaflet.heat";


/**
 * Renders child Heatmap component using points found within the current view bounds.
 */
function HeatmapContainer() {
    const map = useMap();

    const [bounds, setBounds] = useState(map.getBounds());

    const url = urlBoundsFormat(bounds);
    const [result, setUrl] = useApi(url);

    // Restrict minZoom because zooming out too far causes performance issues.
    // Querying location data for basically the entire world is just too much for the current implementation.
    map.options.minZoom = 6;
    map.options.maxZoom = 14;

    useMapEvent('moveend', () => {
        const newBounds: LatLngBounds = map.getBounds();
        setBounds(newBounds);
    });

    useEffect(() => {
        setUrl(urlBoundsFormat(bounds));
    }, [bounds, setUrl]);

    return (
        <div>
            <Sidebar />
            <Heatmap {...{ points: result.data }} />
        </div>
    );
}

export default HeatmapContainer;
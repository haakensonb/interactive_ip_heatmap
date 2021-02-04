import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L, { HeatMapOptions } from 'leaflet';
import 'leaflet.heat';
import { HeatmapProps } from "./types";

/**
 * Clears previous heatmap layer points and then renders new
 * points passed in by parent container.
 * 
 * @param props contains Heatmap points
 */
function Heatmap(props: HeatmapProps) {
    const map = useMap();

    // Hook is needed to store mutable state which keeps track of refernce to a layer group.
    const layerRef = useRef(L.featureGroup());

    useEffect(() => {
        // Clear previous renders.
        layerRef.current.clearLayers();

        // Make sure points have been given.
        const points = (props.points !== undefined) ? props.points : [];

        // Scale radius based on zoom. Larger radius at greater zoom levels.
        const radius = map.getZoom() * 3;

        const options: HeatMapOptions = {
            radius: radius,
            gradient: {
                0.0: 'green',
                0.5: 'yellow',
                1.0: 'red'
            }
        };

        // Add points to layer group so that they can easily be removed upon rerender.
        L.heatLayer(points, options).addTo(layerRef.current);
        layerRef.current.addTo(map);

    }, [map, props.points]);

    return null;
}

export default Heatmap;
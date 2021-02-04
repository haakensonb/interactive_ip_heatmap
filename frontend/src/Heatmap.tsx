import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L, { HeatLatLngTuple, HeatMapOptions, LatLng, LatLngExpression, LatLngLiteral } from 'leaflet';
import 'leaflet.heat';

// import { IPAddressData, State } from './useApi';
import { State } from './useApi';
import { HeatmapProps } from "./HeatmapContainer";

function Heatmap(props: HeatmapProps) {
    const map = useMap();

    const layerRef = useRef(L.featureGroup());

    // L.heatLayer(props.points ? props.points : [], {}).addTo(map);

    useEffect(() => {
        layerRef.current.clearLayers();

        console.log("points", props.points);
        const points = (props.points !== undefined) ? props.points : [];

        const options: HeatMapOptions = {
            // radius: 20,
            gradient: {
                0.0: 'green',
                0.5: 'yellow',
                1.0: 'red'
            },
            // minOpacity: 0.15
        };

        // L.heatLayer(points, options).addTo(map);
        L.heatLayer(points, options).addTo(layerRef.current);
        layerRef.current.addTo(map);
    }, [map, props.points]); // Specifically check for changes in data?

    // L.heatLayer([
    //     [51.504, -0.08, 0.1],
    //     [51.505, -0.10, 100],
    // ], { minOpacity: 0.2 }).addTo(map);

    return null;
}

export default Heatmap;
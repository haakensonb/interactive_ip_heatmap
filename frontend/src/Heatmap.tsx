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
            radius: 10,
            gradient: {
                0.0: 'green',
                0.5: 'yellow',
                1.0: 'red'
            },
            minOpacity: 0.5
        };

        // L.heatLayer(points, options).addTo(map);
        L.heatLayer(points, options).addTo(layerRef.current);
        layerRef.current.addTo(map);
    }, [map, props.points]); // Specifically check for changes in data?

    return null;
}

export default Heatmap;
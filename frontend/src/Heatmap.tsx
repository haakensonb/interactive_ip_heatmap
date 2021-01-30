import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L, { HeatLatLngTuple, HeatMapOptions } from 'leaflet';
import 'leaflet.heat';

function Heatmap() {
    const map = useMap();

    useEffect(() => {
        const points: HeatLatLngTuple[] = [
            [51.56, -0.11, 0.2],
            [51.42, -0.6, 0.5],
            [51.44, -0.6, 0.5],
            [51.46, -0.6, 0.5],
            [51.48, -0.6, 0.5]
        ];

        const options: HeatMapOptions = {
            radius: 30,
            gradient: {
                0.0: 'green',
                0.5: 'yellow',
                1.0: 'red'
            },
            minOpacity: 0.5
        };

        L.heatLayer(points, options).addTo(map);
    }, [map]);

    return null;
}

export default Heatmap;
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L, { HeatLatLngTuple, HeatMapOptions, LatLng, LatLngExpression, LatLngLiteral } from 'leaflet';
import 'leaflet.heat';

// import { IPAddressData, State } from './useApi';
import { State } from './useApi';

function Heatmap(props: State) {
    const map = useMap();

    useEffect(() => {
        console.log("points", props.data);
        const points = (props.data !== undefined) ? props.data : [];

        const options: HeatMapOptions = {
            radius: 15,
            gradient: {
                0.0: 'green',
                0.5: 'yellow',
                1.0: 'red'
            },
            minOpacity: 0.5
        };

        L.heatLayer(points, options).addTo(map);
    }, [map, props.data]); // Specifically check for changes in data?

    return null;
}

export default Heatmap;
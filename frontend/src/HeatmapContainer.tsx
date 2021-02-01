import { LatLng, LatLngBounds, LatLngExpression, LatLngLiteral } from "leaflet";
import { useEffect, useState } from "react";
import { useMapEvent } from "react-leaflet";
import Heatmap from "./Heatmap";
import useApi from "./useApi";

function urlBoundsFormat(bounds: LatLngBounds): string {
    return `http://127.0.0.1:8000/api/ipaddress/?xmin=${bounds.getSouthWest().lat}&ymin=${bounds.getSouthWest().lng}&xmax=${bounds.getNorthEast().lat}&ymax=${bounds.getNorthEast().lng}`;
}

function HeatmapContainer() {
    const dummyBounds: LatLngBounds = new LatLngBounds([51.56, -0.11], [51.42, 0.6]);
    const [bounds, setBounds] = useState(dummyBounds);
    const mult = 0.5;
    const getMaxBounds = (bounds: LatLngBounds, mult: number): LatLngBounds => {
        const sw: LatLngExpression = bounds.getSouthWest();
        const ne: LatLngExpression = bounds.getNorthEast();
        const swMax: LatLngExpression = [(sw.lat - Math.abs(sw.lat * mult)), (sw.lng - Math.abs(sw.lng * mult))];
        const neMax: LatLngExpression = [(ne.lat + Math.abs(ne.lat * mult)), (ne.lng + Math.abs(ne.lng * mult))];
        return new LatLngBounds(swMax, neMax);
    };
    const dummyMaxBounds: LatLngBounds = getMaxBounds(bounds, mult);
    const [maxBounds, setMaxBounds] = useState(dummyMaxBounds);

    const url = urlBoundsFormat(bounds);
    const [result, setUrl] = useApi(url);

    const map = useMapEvent('moveend', () => {
        const newBounds: LatLngBounds = map.getBounds();
        setBounds(newBounds);
    });


    // HACK: This is super bugged. None of the bounds checking in this app check for where it flips on the globe.
    // Not sure if this is working properly...
    useEffect(() => {
        console.log(bounds);
        console.log(maxBounds);
        if ((!maxBounds.contains(bounds.getSouthWest())) || (!maxBounds.contains(bounds.getNorthEast()))) {
            console.log("Exceeded bounds");
            setMaxBounds(getMaxBounds(bounds, mult));
            const url = urlBoundsFormat(maxBounds);
            setUrl(url);
            console.log("result");
            console.log(result);
        }
    }, [bounds, maxBounds, result, setUrl]);

    return (
        <Heatmap {...result} />
    );
}

export default HeatmapContainer;
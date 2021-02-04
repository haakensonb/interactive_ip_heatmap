import { HeatLatLngTuple, LatLng, LatLngBounds, LatLngExpression, LatLngLiteral } from "leaflet";
import { useEffect, useState, useRef } from "react";
import { useMap, useMapEvent } from "react-leaflet";
import Heatmap from "./Heatmap";
import useApi from "./useApi";
import L from "leaflet";
import "leaflet.heat";

function urlBoundsFormat(bounds: LatLngBounds): string {
    return `http://127.0.0.1:8000/api/ipaddress/?top_lat=${bounds.getNorthEast().lat}&top_lng=${bounds.getNorthEast().lng}&bot_lat=${bounds.getSouthWest().lat}&bot_lng=${bounds.getSouthWest().lng}`;
}

// export interface HeatmapProps {
//     points?: LatLng[];
//     bounds: LatLngBounds;
// }

export interface HeatmapProps {
    points?: HeatLatLngTuple[];
}

function HeatmapContainer() {
    const dummyBounds: LatLngBounds = new LatLngBounds([51.56, -0.11], [51.42, 0.6]);
    const [bounds, setBounds] = useState(dummyBounds);
    const mult = 1;
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

    const map = useMap();

    // // HACK: remove anys
    // const toDegrees = (radians: any) => radians * 180 / Math.PI

    // const tile2Lon = (x: any, z: any) => {
    //     return (x / Math.pow(2.0, z) * 360.0 - 180)
    // }

    // const tile2Lat = (y: any, z: any) => {
    //     let n = Math.PI - (2.0 * Math.PI * y) / Math.pow(2.0, z)
    //     return (toDegrees(Math.atan(Math.sinh(n))))
    // }

    // const tile2BoundingBox = (x: any, y: any, zoom: any) => {

    //     let bb: any = {}
    //     bb.north = tile2Lat(y, zoom)
    //     bb.south = tile2Lat(y + 1, zoom)
    //     bb.west = tile2Lon(x, zoom)
    //     bb.east = tile2Lon(x + 1, zoom)
    //     return (bb)
    // }

    // useEffect(() => {
    //     map.eachLayer((layer) => {
    //         layer.on('tileload', (e: any) => {
    //             const { x, y, z } = e.coords;
    //             const bb = tile2BoundingBox(x, y, z);
    //             const newBounds = new LatLngBounds({ 'lat': bb.south, 'lng': bb.west }, { 'lat': bb.north, 'lng': bb.east })
    //             setUrl(urlBoundsFormat(newBounds))
    //         });
    //     });
    // }, [map, bounds, setUrl]);

    // useEffect(() => {
    //     L.heatLayer(result.data ? result.data : [], {}).addTo(map);
    // }, [map, result]);

    useMapEvent('moveend', () => {
        const newBounds: LatLngBounds = map.getBounds();
        setBounds(newBounds);
    });

    useEffect(() => {
        setUrl(urlBoundsFormat(bounds));
    }, [bounds, setUrl]);

    // Def not working properly....
    // HACK: This is super bugged. None of the bounds checking in this app check for where it flips on the globe.
    // Not sure if this is working properly...
    // useEffect(() => {
    //     console.log(bounds);
    //     console.log(maxBounds);
    //     if ((!maxBounds.contains(bounds.getSouthWest())) || (!maxBounds.contains(bounds.getNorthEast()))) {
    //         console.log("Exceeded bounds");
    //         setMaxBounds(getMaxBounds(bounds, mult));
    //         const url = urlBoundsFormat(maxBounds);
    //         setUrl(url);
    //     }
    // }, [bounds, maxBounds, setUrl, setMaxBounds]);

    // return (
    //     <Heatmap {...{ points: result.data, bounds: bounds }} />
    // );

    return (
        <Heatmap {...{ points: result.data }} />
    );
}

export default HeatmapContainer;
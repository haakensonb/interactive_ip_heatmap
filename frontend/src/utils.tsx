import { LatLngBounds } from "leaflet";
import { BASE_URL } from "./my_constants";

/**
 * Verbose but easy way to get url formatted for bounding box query.
 * 
 * @param bounds coordinate bounding box
 */
export function urlBoundsFormat(bounds: LatLngBounds): string {
    return `${BASE_URL}/api/ipaddress/?top_lat=${bounds.getNorthEast().lat}&top_lng=${bounds.getNorthEast().lng}&bot_lat=${bounds.getSouthWest().lat}&bot_lng=${bounds.getSouthWest().lng}`;
}
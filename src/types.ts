import { HeatLatLngTuple } from "leaflet";

export enum FetchStates {
    INIT = 'INIT',
    SUCCESS = 'SUCCESS',
    FAILURE = 'FAILURE'
}

export type Action = {
    type: FetchStates;
    payload?: HeatLatLngTuple[];
}

export type State = {
    isLoading: boolean;
    isError: boolean;
    data?: HeatLatLngTuple[];
}

export interface HeatmapProps {
    points?: HeatLatLngTuple[];
}

export interface SidebarData {
    lng: string;
    lat: string;
    zoom: number;
}
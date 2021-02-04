import axios from "axios";
import { HeatLatLngTuple, LatLng } from "leaflet";
import { useEffect, useState, useReducer } from "react";

enum FetchStates {
    INIT = 'INIT',
    SUCCESS = 'SUCCESS',
    FAILURE = 'FAILURE'
}

type Action = {
    type: FetchStates;
    // payload?: LatLng[];
    payload?: HeatLatLngTuple[];
}

export type State = {
    isLoading: boolean;
    isError: boolean;
    // data: IPAddressData | {};
    // data?: LatLng[];
    data?: HeatLatLngTuple[];
}

function apiFetchReducer(state: State, action: Action): State {
    switch (action.type) {
        case FetchStates.INIT:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case FetchStates.SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload
            };
        case FetchStates.FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        default:
            throw new Error();
    }
}

function useApi(initialUrl: string) {
    const [url, setUrl] = useState(initialUrl);

    const [state, dispatch] = useReducer(apiFetchReducer, {
        isLoading: false,
        isError: false,
        // data: {}
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: FetchStates.INIT });

            try {
                const result = await axios(url);
                // HACK: Need to just return the data in the correct form
                // rather than reprocessing it...
                const data: HeatLatLngTuple[] = result.data.map((p: any) => [p["p"]["lat"], p["p"]["lng"], p["c"]]);
                dispatch({ type: FetchStates.SUCCESS, payload: data });
            } catch (error) {
                dispatch({ type: FetchStates.FAILURE })
            }
        };

        fetchData();
    }, [url]);

    // Need to make sure that custom hook returns constant tuple.
    return [state, setUrl] as const;
}

export default useApi;
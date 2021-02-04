import axios from "axios";
import { HeatLatLngTuple } from "leaflet";
import { useEffect, useState, useReducer } from "react";
import { FetchStates, State, Action } from "./types";


/**
 * Reducer to determine state of GET request such as if it
 * is currently still loading the data.
 * 
 * @param state state of request data
 * @param action possible resulting actions from FetchStates
 */
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


/**
 * Makes GET request to specified URL using reducer to handle state.
 * 
 * @param initialUrl starting url string state
 */
function useApi(initialUrl: string) {
    const [url, setUrl] = useState(initialUrl);

    const [state, dispatch] = useReducer(apiFetchReducer, {
        isLoading: false,
        isError: false,
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: FetchStates.INIT });

            try {
                const result = await axios(url);
                // HACK: Kind of inefficient to map through large arrays to create the proper type...
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
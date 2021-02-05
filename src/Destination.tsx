import { useState } from "react";
import { useMap } from "react-leaflet";

function Destination() {
    const map = useMap();

    const [lat, setLat] = useState("51.5098");
    const [lng, setLng] = useState("-0.1180");
    const [isError, setError] = useState(false);

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const latNum = parseFloat(lat);
        const lngNum = parseFloat(lng);

        if (isValidCoords(latNum, lngNum)) {
            setError(false);
            map.setView([latNum, lngNum]);
        } else {
            setError(true);
        }
    };

    const isValidCoords = (lat: number, lng: number): boolean => {
        if ((lat >= -90 && lat <= 90) && (lng >= -180 && lng <= 180)) {
            return true;
        }
        return false;
    };


    return (
        <div className="destStyle">
            <form onSubmit={handleSubmit}>
                <div className="columns is-vcentered">
                    <div className="column">
                        Lat: <input
                            type="text"
                            value={lat}
                            size={10}
                            onChange={e => setLat(e.target.value)} />
                    </div>

                    <div className="column">
                        Lng: <input
                            type="text"
                            value={lng}
                            size={10}
                            onChange={e => setLng(e.target.value)} />
                    </div>

                    <div className="column">
                        <input className="button is-success" type="submit" value="Go To" />
                        {isError &&
                            <div className="has-background-danger">Must be valid lat/lng</div>
                        }
                    </div>
                </div>

            </form>
        </div>
    );
}

export default Destination;
import { useRef } from "react";

import classes from './GetCoords.module.css';

const GetCoords = () => {
    const mapRef = useRef();

    const myLatlng = { lat: -25.363, lng: 131.044 };

    const map = new window.google.maps.Map(mapRef.current, {
        zoom: 4,
        center: myLatlng,
    });

    // Create the initial InfoWindow.
    let infoWindow = new window.google.maps.InfoWindow({
        content: "Click the map to get Lat/Lng!",
        position: myLatlng,
    });

    infoWindow.open(map);

    // Configure the click listener.
    map.addListener("click", (mapsMouseEvent) => {
        // Close the current InfoWindow.
        infoWindow.close();
        // console.log(mapsMouseEvent.latLng.toJSON());
        // Create a new InfoWindow.
        infoWindow = new window.google.maps.InfoWindow({
            position: mapsMouseEvent.latLng,
        });
        infoWindow.setContent(
            JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
        );
        infoWindow.open(map);
    });

    return (
        <div ref={mapRef} className={classes.map}></div>
    )
}

export default GetCoords;
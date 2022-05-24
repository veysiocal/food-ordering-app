import React, { useEffect, useRef } from 'react';

import classes from './Map.css';

const Map = props => {
    const mapRef = useRef();

    const { center, zoom } = props;

    useEffect(() => {
        const map = new window.google.maps.Map(mapRef.current, {
            center: center,
            zoom: zoom,
        });

        new window.google.maps.Marker({
            position: center,
            map: map,
        });
    }, [center, zoom])

    console.log("mparef: ", mapRef);
    return (
        <>
            <header>
                <h1>MAP</h1>
            </header>
            <section className={classes.section}>
                <h3>DSDSAD</h3>
                <div ref={mapRef}style={props.style}>

                </div>

            </section>
        </>

    )
}

export default Map;
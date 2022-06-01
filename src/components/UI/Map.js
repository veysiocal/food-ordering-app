import React, { useRef, useEffect } from 'react';

import './Map.css';

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
    }, [center, zoom]) // useEffect kullanmamızın nedeni; mapRef aşağıda return ediliyor. Ancak biz burda map objesini
                // oluştururken useRef'i kullanmamız lazım. 
                // useEffect jsx return edildilkten sonra çalışır.
                // bu yüzden useEffect içerisinde yazmazsak hata veriyor.


   
    return (
        <div ref={mapRef} className={`map ${props.className}`} style={props.style} ></div>
    )
};

export default Map;
import React, { useEffect, useState } from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { getGeo } from "../http/geoApi";

export default function GoogleMap({ address }) {

    const [lat, setLat] = useState(false);
    const [lon, setLon] = useState(false);
    useEffect(() => {
        if (address) {
            getGeo(address).then((data) => {
                setLat(data[0]?.lat);
                setLon(data[0]?.lon);
                console.log(data[0]?.display_name)
            })
        }

    }, [address])

    const defaultState = {
        center: [lat, lon],
        zoom: 15,
    };

    return (
        <YMaps style={{ marginLeft: "300px" }}>
            {lat && lon &&
                <Map defaultState={defaultState} width={1116} height={500}>
                    <Placemark geometry={[lat, lon]} />
                </Map>
            }
        </YMaps>
    );
}
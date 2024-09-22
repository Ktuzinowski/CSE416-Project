import React, { useEffect, useState } from "react"
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet"
import 'leaflet/dist/leaflet.css'
import utahData from "./utah.geojson"

export const UtahMap = () => {
    const [geoData, setGeoData] = useState(null);

    useEffect(() => {
        // Fetch the GeoJSON data from the file
        fetch(utahData)
            .then((response) => response.json())
            .then((data) => {
                setGeoData(data)
            })
        .catch((error) => console.error('Error loading the GeoJSON data: ', error))
    }, [])

    const onEachFeature = (feature, layer) => {
        layer.bindPopup(feature.properties.name) // Optinally bind a popup to each feature
    }

    return (
        <MapContainer
        center={[39.320980, -111.093731]} // Center the map on Utah's coordinates
        zoom={6}
        style={{ height: '100%', width: '100%' }}  // Full screen height (vh = viewport height)
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {
                geoData && (
                    <GeoJSON
                    data={geoData}
                    style={() => ({
                        color: 'black',
                        fillColor: 'white',
                        weight: 2
                    })}
                    onEachFeature={onEachFeature}
                    />
                )
            }
        </MapContainer>
    )
}
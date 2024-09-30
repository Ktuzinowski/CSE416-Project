import React, { useEffect, useState } from "react"
import { MapContainer, TileLayer, GeoJSON, LayersControl } from "react-leaflet"
import 'leaflet/dist/leaflet.css'
import utahCongressionalData from "./utah_data/utah_congressional_plan.geojson"
import { LeftDataPanel } from "./LeftDataPanel"

const { Overlay } = LayersControl

export const UtahMap = () => {
    const [congressionalDistricts, setCongressionalDistricts] = useState(null)

    useEffect(() => {
        fetch(utahCongressionalData)
            .then((response) => response.json())
            .then((data) => {
                setCongressionalDistricts(data)
            })
        .catch((error) => console.error("Error loading the Congressional Districts GeoJSON data: ", error))
    }, [])

    const showPopulationData = (feature, layer) => {
        const popupContent = `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
            <h3 style="margin: 0;">District No: ${feature.properties.DISTRICTNO}</h3>
            <p><strong>Population:</strong> ${feature.properties.TAPERSONS}</p>
            <p><strong>Voting Age Population:</strong> ${feature.properties.VAPERSONS}</p>
        </div>
        `;
        layer.bindPopup(popupContent);
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
            <LayersControl>
                <Overlay name="Congressional Districts" checked>
                    {
                        congressionalDistricts && (
                            <GeoJSON
                            data={congressionalDistricts}
                            style={() => ({
                                color: 'black',
                                fillColor: 'white',
                                weight: 2
                            })}
                            onEachFeature={showPopulationData}
                            />
                        )
                    }
                </Overlay>
            </LayersControl>
        </MapContainer>
    )
}
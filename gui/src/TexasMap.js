import React, { useEffect, useState } from "react"
import { MapContainer, TileLayer, GeoJSON, LayersControl, ZoomControl } from "react-leaflet"
import 'leaflet/dist/leaflet.css'
import texasCongressionalData from "./texas_data/texas_congressional_plan.geojson"
import { LeftDataPanel } from "./LeftDataPanel"
import { MAPBOX_ACCESS_TOKEN } from "./constants"

const { Overlay } = LayersControl

export const TexasMap = () => {
    const [congressionalDistricts, setCongressionalDistricts] = useState(null)

    useEffect(() => {
        fetch(texasCongressionalData)
        .then((response) => response.json())
        .then((data) => {
            setCongressionalDistricts(data)
        })
    .catch((error) => console.error("Error loading the Congressional Districts GeoJSON data: ", error))
    }, [])

    const showPopulationData = (feature, layer) => {
        console.log(feature.properties)
        const popupContent = `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
            <h3 style="margin: 0;">District No: ${feature.properties.DIST_NBR}</h3>
            <p><strong>Representative Name:</strong> ${feature.properties.REP_NM}</p>
        </div>
        `;
        layer.bindPopup(popupContent);
    }

    return (
        <>
        <LeftDataPanel data={congressionalDistricts}/>
        <MapContainer
        center={[31.9686, -99.9018]} // Center the map on Utah's coordinates
        zoom={6}
        minZoom={3}
        maxZoom={10}
        style={{ height: '94%', top: '6%' }}  // Full screen height (vh = viewport height)
        zoomControl={false} // Disable default zoom control
        >
            <TileLayer
                    url={`https://api.mapbox.com/styles/v1/ktuzinowski/cm1msivj900k601p69fqk5tlt/tiles/256/{z}/{x}/{y}@2x?access_token=${MAPBOX_ACCESS_TOKEN}&fresh=True`}
                    attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a>'
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

            <ZoomControl position="bottomright" />
        </MapContainer>
        </>
    )
}
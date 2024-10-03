import React, { useEffect, useState, useRef } from "react"
import { MapContainer, TileLayer, GeoJSON, LayersControl, ZoomControl } from "react-leaflet"
import 'leaflet/dist/leaflet.css'
import utahCongressionalData from "./utah_data/utah_congressional_plan.geojson"
import { LeftDataPanel } from "./LeftDataPanel"
import { MAPBOX_ACCESS_TOKEN } from "./constants"
import { COLORS } from "./Colors"

const { Overlay } = LayersControl

export const UtahMap = () => {
    const [congressionalDistricts,setCongressionalDistricts] = useState(null)
    const [selectedFeature, setSelectedFeature] = useState(null); // State for selected feature
    const [districtColors, setDistrictColors] = useState({})
    const geoJsonRef = useRef(); // Ref to access GeoJSON layer
    const mapRef = useRef(); // Ref to access the map instance
    
    useEffect(() => {
        fetch(utahCongressionalData)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setCongressionalDistricts(data)
                const colors = {};
                data.features.forEach((feature, index) => {
                const district = feature.properties.DISTRICT;
                    if (!colors[district]) {
                        colors[district] = {
                            color: "black",
                            fillColor: COLORS[index],
                            fillOpacity: 0.6
                        }
                    }
                });
                setDistrictColors(colors); // Set district colors after processing all features
            })
        .catch((error => console.error("Error loading the Congressional Districts GeoJSON data: ", error)))
    }, [])

    // Zoom to selected feature whenever it changes
    useEffect(() => {
        if (selectedFeature && geoJsonRef.current && mapRef.current) {
            const layer = geoJsonRef.current.getLayers().find(l => 
                l.feature.properties.DISTRICT === selectedFeature.properties.DISTRICT
            );
            if (layer) {
                const bounds = layer.getBounds();
                
                mapRef.current.fitBounds(bounds);
            }
        }
    }, [selectedFeature]);

    const styleFeature = (feature) => {
        const district = feature.properties.DISTRICT

        return {
            color: districtColors[district].color, // border color for each district
            fillColor: districtColors[district].fillColor, // unique color for the district
            weight: 2,
            fillOpacity: districtColors[district].fillOpacity
        }
    }

    const showPopulationData = (feature, layer) => {
        const popupContent = `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
            <h3 style="margin: 0;">District No: ${feature.properties.DISTRICT}</h3>
            <p><strong>Population:</strong> ${feature.properties.POPULATION}</p>
            <p><strong>Voting Age Population:</strong> ${feature.properties.TOTAL18}</p>
        </div>
        `;
        layer.bindPopup(popupContent);
    }

    // Pass the selected feature back to the parent when clicked
    const onSelectFeature = (feature) => {
        setSelectedFeature(feature)
    }

    const onChangeBorderForHoverOverDistrict = (district_number) => {
        console.log("Changing colors here!")
        setDistrictColors((prevColors) => {
            return (
                {
                    ...prevColors,
                    [district_number]: {
                        color: prevColors[district_number].fillColor,
                        fillColor: prevColors[district_number].fillColor,
                        fillOpacity: 0.8
                    }
                }
            )
        })
    }

    const onChangeLeftHoverOverDistrict = (district_number) => {
        console.log("Changing colors here!")
        setDistrictColors((prevColors) => {
            return (
                {
                    ...prevColors,
                    [district_number]: {
                        color: "black",
                        fillColor: prevColors[district_number].fillColor,
                        fillOpacity: 0.6
                    }
                }
            )
        })
    }

    return (
        <>
        <div className="map-wrapper">  {/* New wrapper for Flexbox layout */}
            <LeftDataPanel data={congressionalDistricts} onSelectFeature={onSelectFeature} districtColors={districtColors} onChangeBorderForHoverOverDistrict={onChangeBorderForHoverOverDistrict} onChangeLeftHoverOverDistrict={onChangeLeftHoverOverDistrict} />
            <div className="map-container">
                <MapContainer
                    center={[34.0489, -113.0937]} // Center the map on Utah's coordinates
                    zoom={6}
                    minZoom={3}
                    maxZoom={10}
                    className="map-container"  // Attach the new class
                    zoomControl={false} // Disable default zoom control
                    ref={mapRef} // Attach the ref to the MapContainer
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
                                        ref={geoJsonRef} // Set reference to GeoJSON layer
                                        data={congressionalDistricts}
                                        style={styleFeature} // Use dynamic styling for each feature
                                        onEachFeature={showPopulationData}
                                        />
                                    )
                                }
                        </Overlay>
                    </LayersControl>

                    <ZoomControl position="bottomright" />
                </MapContainer>
            </div>
            </div>
        </>
    )
}
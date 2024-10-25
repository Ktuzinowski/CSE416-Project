import { useState, useEffect } from "react"
import { MapContainer, TileLayer, GeoJSON, ZoomControl } from 'react-leaflet';
import { MAPBOX_ACCESS_TOKEN } from "./utils/Constants"
import "leaflet/dist/leaflet.css"; // Ensure Leaflet CSS is imported
import { REQUESTS, axiosClient } from './axiosClient';

export const HomePage = () => {
    const [stateOutlines, setStateOutlines] = useState(null);

    const fetchDistrictOutlines = async () => {
        try {
            const response = await axiosClient.get(REQUESTS.State_Outlines);
            setStateOutlines(response.data);
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetchDistrictOutlines();
    }, [])

    const onEachFeature = (feature, layer) => {
        layer.on({
            click: () => {
                window.location.href = feature.properties.link;
            }
        });
    };

    const bounds = [
        [24.396308, -125.0],
        [49.384358, -66.93457]
      ];

    return (
        <>            
            <MapContainer className='home_page_map_container' center={[38, -95]} zoom={4} minZoom={4} maxZoom={8} maxBounds={bounds}  // Set the bounding box
            maxBoundsViscosity={1.0}  // Prevent the map from panning out of the bounds     
            zoomControl={false} // Disable default zoom control
            >
                <TileLayer
                    url={`https://api.mapbox.com/styles/v1/ktuzinowski/cm1msivj900k601p69fqk5tlt/tiles/256/{z}/{x}/{y}@2x?access_token=${MAPBOX_ACCESS_TOKEN}&fresh=True`}
                    attribution="&copy; OpenStreetMap contributors"
                />
                {stateOutlines && <GeoJSON data={stateOutlines} onEachFeature={onEachFeature} />}
                <ZoomControl position="bottomright" />
            </MapContainer>
        </>
    );
};

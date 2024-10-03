import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, LayersControl, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import utahCountyData from "./utah_data/utah_counties_cpy.geojson";
import { LeftDataPanel } from "./LeftDataPanel"
import { MAPBOX_ACCESS_TOKEN } from "./constants"

const { Overlay } = LayersControl;

export const UtahMap = () => {
  const [counties, setCounties] = useState(null);

  useEffect(() => {
    fetch(utahCountyData)
      .then((response) => response.json())
      .then((data) => {
        setCounties(data);
      })
      .catch((error) =>
        console.error(
          "Error loading the Congressional Districts GeoJSON data: ",
          error
        )
      );
  }, []);

  const showPopulationData = (feature, layer) => {
    const popupContent = `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
            <h3 style="margin: 0;">${feature.properties.COUNTY}</h3>
            <p><strong>Population:</strong> ${feature.properties.TOT_POP22}</p>
            <p><strong>White:</strong> ${feature.properties.WHT_NHSP22}</p>
            <p><strong>Black:</strong> ${feature.properties.BLK_NHSP22}</p>
            <p><strong>Hispanic:</strong> ${feature.properties.HSP_POP22}</p>
            <p><strong>Asian:</strong> ${feature.properties.ASN_NHSP22}</p>
            <p><strong>Native:</strong> ${feature.properties.AIA_NHSP22}</p>
            <p><strong>Pacific:</strong> ${feature.properties.HPI_NHSP22}</p>
            <p><strong>Other:</strong> ${feature.properties.OTH_NHSP22}</p>
           

        </div>
        `;
    layer.bindPopup(popupContent);
    layer.on("mouseover", function (e) {
      layer.openPopup(e.latlng);
    });

    layer.on("mouseout", function () {
      layer.closePopup();
    });
  };

  return (
    <>
    <LeftDataPanel data={counties} />
    <MapContainer
      center={[39.32098, -111.093731]} // Center the map on Utah's coordinates
      zoom={6}
      minZoom={3}
      maxZoom={10}
      style={{ height: "94%", top: "6%" }} // Full screen height (vh = viewport height)
      zoomControl={false} // Disable default zoom control
    >
      <TileLayer
                    url={`https://api.mapbox.com/styles/v1/ktuzinowski/cm1msivj900k601p69fqk5tlt/tiles/256/{z}/{x}/{y}@2x?access_token=${MAPBOX_ACCESS_TOKEN}&fresh=True`}
                    attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a>'
      />
      <LayersControl>
        <Overlay name="Counties" checked>
          {counties && (
            <GeoJSON
              data={counties}
              style={() => ({
                color: "black",
                fillColor: "white",
                weight: 2,
              })}
              onEachFeature={showPopulationData}
            />
          )}
        </Overlay>
      </LayersControl>
      <ZoomControl position="bottomright" />
    </MapContainer>
    </>
  );
};

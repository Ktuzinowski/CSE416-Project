import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import utahCountyData from "./utah_data/utah_counties_cpy.geojson";

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
    <MapContainer
      center={[39.32098, -111.093731]} // Center the map on Utah's coordinates
      zoom={6}
      style={{ height: "100%", width: "100%" }} // Full screen height (vh = viewport height)
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
    </MapContainer>
  );
};

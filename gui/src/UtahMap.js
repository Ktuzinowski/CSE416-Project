import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, LayersControl, useMap } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import utahCongressionalData from "./utah_data/utah_congressional_plan.geojson";
import utahPrecinctData from "./utah_data/Utah_precinct.geojson";

const { Overlay } = LayersControl;

// Create a component to define panes
const CreatePanes = () => {
  const map = useMap();

  // Define the precincts pane
  map.createPane('precinctsPane');
  map.getPane('precinctsPane').style.zIndex = 400;

  // Define the districts pane
  map.createPane('districtsPane');
  map.getPane('districtsPane').style.zIndex = 500;

  return null; // This component doesn't render any visible content
};

export const UtahMap = () => {
  const [congressionalDistricts, setCongressionalDistricts] = useState(null);
  const [precinct, setPrecinct] = useState(null);

  useEffect(() => {
    fetch(utahCongressionalData)
      .then((response) => response.json())
      .then((data) => {
        setCongressionalDistricts(data);
      })
      .catch((error) =>
        console.error("Error loading the Congressional Districts GeoJSON data: ", error)
      );
  }, []);

  useEffect(() => {
    fetch(utahPrecinctData)
      .then((response) => response.json())
      .then((data) => {
        setPrecinct(data);
        console.log("This is the precinct data");
        console.log(data);
      })
      .catch((error) =>
        console.error("Error loading the Precinct GeoJSON data: ", error)
      );
  }, []);

  const showPopulationData = (feature, layer) => {
    const popupContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h3 style="margin: 0;">District No: ${feature.properties.DISTRICTNO}</h3>
        <p><strong>Population:</strong> ${feature.properties.TAPERSONS}</p>
        <p><strong>Voting Age Population:</strong> ${feature.properties.VAPERSONS}</p>
      </div>
    `;
    layer.bindPopup(popupContent);
  };

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

      {/* Component to define and set panes */}
      <CreatePanes />

      <LayersControl>
        <Overlay name="Congressional Districts" checked>
          {
            congressionalDistricts && (
              <GeoJSON
                data={congressionalDistricts}
                pane="districtsPane"  // Assign to districts pane
                style={() => ({
                  color: 'blue',
                  fillColor: 'lightblue',
                  weight: 2
                })}
                onEachFeature={showPopulationData}
              />
            )
          }
        </Overlay>

        <Overlay name="Precinct Data">
          {
            precinct && (
              <GeoJSON
                data={precinct}
                pane="precinctsPane"  // Assign to precincts pane
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
  );
};
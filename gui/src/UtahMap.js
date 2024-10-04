import React, { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  LayersControl,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import utahCongressionalData from "./utah_data/utah_congressional_plan.geojson";
import { LeftDataPanel } from "./LeftDataPanel";
import { MAPBOX_ACCESS_TOKEN } from "./constants";
import utahPrecinctData from "./utah_data/aggregated_pre.geojson";
import { COLORS } from "./Colors";
import utahAggDistrictData from "./utah_data/aggregatedUtahDistricts.geojson";
import chroma from "chroma-js"; //this for the chloropeth map

const { Overlay } = LayersControl;

export const UtahMap = () => {
  const [congressionalDistricts, setCongressionalDistricts] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null); // State for selected feature
  const [districtColors, setDistrictColors] = useState({});
  const [precincts, setPrecincts] = useState(null);
  const [selectedRace, setSelectedRace] = useState("PP_BAAALN"); // State for selecting CHOROPLETH race, defaulted on black
  const geoJsonRef = useRef(); // Ref to access GeoJSON layer
  const mapRef = useRef(); // Ref to access the map instance

  useEffect(() => {
    fetch(utahAggDistrictData)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCongressionalDistricts(data);
        const colors = {};
        data.features.forEach((feature, index) => {
          const district = feature.properties.DISTRICT;
          if (!colors[district]) {
            colors[district] = {
              color: "black",
              fillColor: COLORS[index],
              fillOpacity: 0.6,
            };
          }
        });
        setDistrictColors(colors); // Set district colors after processing all features
      })
      .catch((error) =>
        console.error(
          "Error loading the Congressional Districts GeoJSON data: ",
          error
        )
      );
  }, []);

  useEffect(() => {
    fetch(utahPrecinctData)
      .then((response) => response.json())
      .then((data) => {
        // Iterate over each feature and add the DISTRICT property
        const updatedData = {
          ...data,
          features: data.features.map((feature, index) => ({
            ...feature,
            properties: {
              ...feature.properties,
              DISTRICT: 1, // Assign a value to the DISTRICT property
            },
          })),
        };

        setPrecincts(updatedData); // Set the updated GeoJSON data
        console.log("Updated precinct data with DISTRICT:", updatedData);
      })
      .catch((error) =>
        console.error("Error loading the Precinct GeoJSON data: ", error)
      );
  }, []);

  // useEffect(() => {
  //   fetch(utahAggDistrictData)
  //     .then((response) => response.json())
  //     .then((data) => {

  //       setCongressionalDistricts(data); // Set the updated GeoJSON data
  //       console.log("Update with aggregated precinct data to District:", data);
  //     })
  //     .catch((error) =>
  //       console.error("Error loading the Precinct GeoJSON data: ", error)
  //     );
  // }, []);

  // Zoom to selected feature whenever it changes
  useEffect(() => {
    if (selectedFeature && geoJsonRef.current && mapRef.current) {
      const layer = geoJsonRef.current
        .getLayers()
        .find(
          (l) =>
            l.feature.properties.DISTRICT ===
            selectedFeature.properties.DISTRICT
        );
      if (layer) {
        const bounds = layer.getBounds();

        mapRef.current.fitBounds(bounds);
      }
    }
  }, [selectedFeature]);

  const styleFeature = (feature) => {
    const district = feature.properties.DISTRICT;

    return {
      color: districtColors[district].color, // border color for each district
      fillColor: districtColors[district].fillColor, // unique color for the district
      weight: 2,
      fillOpacity: districtColors[district].fillOpacity,
    };
  };

  // const stylePrecincts = (feature) => {
  //   return {
  //     color: "black",
  //     fillColor: "none",
  //     weight: 2,
  //     fillOpacity: 0
  //   }
  // }

  //choropleth color scale
  const colorScale = chroma
    .scale(["#ffe6cc", "#ff6600", "#ff3300"])
    .domain([0, 100]);

  const stylePrecincts = (feature) => {
    const totalPop = feature.properties.PP_TOTAL;
    const racePop = feature.properties[selectedRace];
    const percent = totalPop > 0 ? (racePop / totalPop) * 100 : 0;

    //fill teh colors based on the racial demogprahic percentage
    const fillColor = colorScale(percent).hex();

    return {
      color: "#000",
      fillColor: fillColor,
      weight: 1,
      fillOpacity: 0.7,
    };
  };

  const showPopulationData = (feature, layer) => {
    const popupContent = `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
            <h3 style="margin: 0;">Precinct: ${
              feature.properties.resultspre
            }</h3>
            <p><strong>Republican:</strong> ${feature.properties.G20PRERTRU}</p>
            <p><strong>Democrat:</strong> ${feature.properties.G20PREDBID}</p>
            <p><strong>Population:</strong> ${feature.properties.PP_TOTAL}</p>

            <p><strong>White:</strong> ${(
              (feature.properties.PP_WHTALN / feature.properties.PP_TOTAL) *
              100
            ).toFixed(2)}%</p>
            <p><strong>Black:</strong> ${(
              (feature.properties.PP_BAAALN / feature.properties.PP_TOTAL) *
              100
            ).toFixed(2)}%</p>
            <p><strong>Hispanic:</strong> ${(
              (feature.properties.PP_HISPLAT / feature.properties.PP_TOTAL) *
              100
            ).toFixed(2)}%</p>
            <p><strong>Asian:</strong> ${(
              (feature.properties.PP_ASNALN / feature.properties.PP_TOTAL) *
              100
            ).toFixed(2)}%</p>
            <p><strong>Pacific:</strong> ${(
              (feature.properties.PP_HPIALN / feature.properties.PP_TOTAL) *
              100
            ).toFixed(2)}%</p>
            <p><strong>Native:</strong> ${(
              (feature.properties.PP_NAMALN / feature.properties.PP_TOTAL) *
              100
            ).toFixed(2)}%</p>
            <p><strong>Other:</strong> ${(
              (feature.properties.PP_OTHALN / feature.properties.PP_TOTAL) *
              100
            ).toFixed(2)}%</p>

        </div>
        `;
    layer.bindPopup(popupContent);
  };

  const showDistrictData = (feature, layer) => {
    const popupContent = `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
            <h3 style="margin: 0;">District: ${feature.properties.DISTRICT}</h3>
            <p><strong>Republican:</strong> ${feature.properties.G20PRERTRU}</p>
            <p><strong>Democrat:</strong> ${feature.properties.G20PREDBID}</p>
            <p><strong>Population:</strong> ${feature.properties.PP_TOTAL}</p>

            <p><strong>White:</strong> ${(
              (feature.properties.PP_WHTALN / feature.properties.PP_TOTAL) *
              100
            ).toFixed(2)}%</p>
            <p><strong>Black:</strong> ${(
              (feature.properties.PP_BAAALN / feature.properties.PP_TOTAL) *
              100
            ).toFixed(2)}%</p>
            <p><strong>Hispanic:</strong> ${(
              (feature.properties.PP_HISPLAT / feature.properties.PP_TOTAL) *
              100
            ).toFixed(2)}%</p>
            <p><strong>Asian:</strong> ${(
              (feature.properties.PP_ASNALN / feature.properties.PP_TOTAL) *
              100
            ).toFixed(2)}%</p>
            <p><strong>Pacific:</strong> ${(
              (feature.properties.PP_HPIALN / feature.properties.PP_TOTAL) *
              100
            ).toFixed(2)}%</p>
            <p><strong>Native:</strong> ${(
              (feature.properties.PP_NAMALN / feature.properties.PP_TOTAL) *
              100
            ).toFixed(2)}%</p>
            <p><strong>Other:</strong> ${(
              (feature.properties.PP_OTHALN / feature.properties.PP_TOTAL) *
              100
            ).toFixed(2)}%</p>

        </div>
        `;
    layer.bindPopup(popupContent);
  };

  // Pass the selected feature back to the parent when clicked
  const onSelectFeature = (feature) => {
    setSelectedFeature(feature);
  };

  const onChangeBorderForHoverOverDistrict = (district_number) => {
    console.log("Changing colors here!");
    setDistrictColors((prevColors) => {
      return {
        ...prevColors,
        [district_number]: {
          color: prevColors[district_number].fillColor,
          fillColor: prevColors[district_number].fillColor,
          fillOpacity: 0.8,
        },
      };
    });
  };

  const onChangeLeftHoverOverDistrict = (district_number) => {
    console.log("Changing colors here!");
    setDistrictColors((prevColors) => {
      return {
        ...prevColors,
        [district_number]: {
          color: "black",
          fillColor: prevColors[district_number].fillColor,
          fillOpacity: 0.6,
        },
      };
    });
  };

  return (
    <>
      <div className="map-wrapper">
        {" "}
        {/* New wrapper for Flexbox layout */}
        <LeftDataPanel
          data={congressionalDistricts}
          onSelectFeature={onSelectFeature}
          districtColors={districtColors}
          onChangeBorderForHoverOverDistrict={
            onChangeBorderForHoverOverDistrict
          }
          onChangeLeftHoverOverDistrict={onChangeLeftHoverOverDistrict}
          selectedRace={selectedRace}
          setSelectedRace={setSelectedRace}
        />
        <div className="map-container">
          <MapContainer
            center={[39.32098, -111.093731]} // Center the map on Utah's coordinates
            zoom={6}
            minZoom={3}
            maxZoom={11}
            className="map-container" // Attach the new class
            zoomControl={false} // Disable default zoom control
            ref={mapRef} // Attach the ref to the MapContainer
          >
            <TileLayer
              url={`https://api.mapbox.com/styles/v1/ktuzinowski/cm1msivj900k601p69fqk5tlt/tiles/256/{z}/{x}/{y}@2x?access_token=${MAPBOX_ACCESS_TOKEN}&fresh=True`}
              attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a>'
            />
            <LayersControl>
              <Overlay name="Congressional Districts" checked>
                {congressionalDistricts && (
                  <GeoJSON
                    ref={geoJsonRef} // Set reference to GeoJSON layer
                    data={congressionalDistricts}
                    style={styleFeature} // Use dynamic styling for each feature
                    onEachFeature={showDistrictData}
                  />
                )}
              </Overlay>

              <Overlay name="Precincts" checked>
                {precincts && (
                  <GeoJSON
                    data={precincts}
                    style={stylePrecincts} // Use dynamic styling for each feature
                    onEachFeature={showPopulationData}
                  />
                )}
              </Overlay>
            </LayersControl>

            <ZoomControl position="bottomright" />
          </MapContainer>
        </div>
      </div>
    </>
  );
};

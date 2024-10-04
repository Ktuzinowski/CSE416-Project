import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LeftDataPanel } from "./LeftDataPanel";
import { LeftPrecinctPanel } from "./LeftPrecinctPanel";
import { MAPBOX_ACCESS_TOKEN } from "./constants";
import utahPrecinctData from "./utah_data/aggregated_pre.geojson";
import { COLORS } from "./Colors";
import utahAggDistrictData from "./utah_data/aggregatedUtahDistricts.geojson";
import utahGeo from "./utah_data/utah.geojson";
import chroma from "chroma-js"; //this for the chloropeth map

export const UtahMap = () => {
  const [congressionalDistricts, setCongressionalDistricts] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null); // State for selected feature
  const [districtColors, setDistrictColors] = useState({});
  const [precincts, setPrecincts] = useState(null);
  const [utGeo, setGeo] = useState(null);
  const [selectedRace, setSelectedRace] = useState(""); // State for selecting CHOROPLETH race, defaulted on black
  const geoJsonRef = useRef(); // Ref to access GeoJSON layer
  const mapRef = useRef(); // Ref to access the map instance
  const [activeLayer, setActiveLayer] = useState("districts"); // State to track the active layer

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

  // New useEffect to fetch Utah GeoJSON and aggregate specified variables
  useEffect(() => {
    fetch(utahGeo)
      .then((response) => response.json())
      .then((utahData) => {
        if (congressionalDistricts) {
          const variables = [
            "G20PRERTRU",
            "G20PREDBID",
            "PP_TOTAL",
            "PP_WHTALN",
            "PP_BAAALN",
            "PP_NAMALN",
            "PP_ASNALN",
            "PP_HPIALN",
            "PP_HISPLAT",
            "PP_OTHALN",
          ];

          const aggregatedValues = {};

          // Initialize the aggregatedValues for the desired variables
          variables.forEach((variable) => {
            aggregatedValues[variable] = 0;
          });

          // Aggregate values from congressionalDistricts
          congressionalDistricts.features.forEach((feature) => {
            variables.forEach((variable) => {
              if (feature.properties[variable]) {
                aggregatedValues[variable] += feature.properties[variable];
              }
            });
          });

          // Add aggregated values to the Utah GeoJSON properties
          utahData.properties = {
            ...utahData.properties,
            ...aggregatedValues,
          };

          setGeo(utahData); // Set the updated Utah GeoJSON data
          console.log("Updated Utah GeoJSON with aggregated values:", utahData);
        }
      })
      .catch((error) =>
        console.error("Error loading the Utah GeoJSON data: ", error)
      );
  }, [congressionalDistricts]); // Dependency array to run when congressionalDistricts is available

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
    .scale(["#e6ffe6", "#00cc00", "#004d00"]) // Light green to dark green
    .domain([0, 100]);

  // Choropleth color scale with shades of red
  const colorScaleRed = chroma
    .scale(["#ffe6e6", "#ff4d4d", "#990000"]) // Light red to dark red
    .domain([0, 100]);

  // Choropleth color scale with shades of blue
  const colorScaleBlue = chroma
    .scale(["#e6f0ff", "#4d79ff", "#003399"]) // Light blue to dark blue
    .domain([0, 100]);

  const stylePrecincts = (feature) => {
    let totalPop = feature.properties.PP_TOTAL;
    const racePop = feature.properties[selectedRace];
    if (selectedRace === "G20PRERTRU" || selectedRace === "G20PREDBID") {
      totalPop =
        feature.properties["G20PRERTRU"] + feature.properties["G20PREDBID"];
    }
    const percent = totalPop > 0 ? (racePop / totalPop) * 100 : 0;

    //fill teh colors based on the racial demogprahic percentage
    let fillColor = colorScale(percent).hex();

    if (selectedRace === "") {
      fillColor = "#ffff";
    } else if (selectedRace === "G20PRERTRU") {
      fillColor = colorScaleRed(percent).hex();
    } else if (selectedRace === "G20PREDBID") {
      fillColor = colorScaleBlue(percent).hex();
    }

    return {
      color: "#000",
      fillColor: fillColor,
      weight: 1,
      fillOpacity: 0.7,
    };
  };

  const styleElection = (feature) => {
    const demVotes = feature.properties.G20PREDBID || 0; // Democratic votes
    const repVotes = feature.properties.G20PRERTRU || 0; // Republican votes
    const totalVotes = demVotes + repVotes;

    // Calculate the difference and normalize to a range
    const voteDifference = Math.abs(demVotes - repVotes);
    const maxVotes = Math.max(demVotes, repVotes);

    // Determine color based on the votes
    let color;
    if (totalVotes === 0) {
      color = "#d3d3d3"; // Default color for no votes
    } else {
      const intensity = Math.min(voteDifference / maxVotes, 1); // Normalize between 0 and 1

      // Generate shades based on the party majority
      color =
        demVotes > repVotes
          ? `rgba(0, 0, 255, ${0.5 + 0.5 * intensity})` // Blue shade for Democratic majority
          : `rgba(255, 0, 0, ${0.5 + 0.5 * intensity})`; // Red shade for Republican majority
    }

    return {
      color: "#000", // Outline color
      fillColor: color,
      weight: 1,
      fillOpacity: 0.8,
    };
  };

  const styleDistricts = (feature) => {
    if (selectedRace === "") {
      //if NOT choropleth
      const district = feature.properties.DISTRICT;

      return {
        color: districtColors[district].color, // border color for each district
        fillColor: districtColors[district].fillColor, // unique color for the district
        weight: 2,
        fillOpacity: districtColors[district].fillOpacity,
      };
    } else {
      //if CHOROpleth
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
    }
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

  const showUTData = (feature, layer) => {
    const popupContent = `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
            <h3 style="margin: 0;">MMD: 4 representatives</h3>
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
    if (activeLayer !== "districts") {
      return;
    }
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
    if (activeLayer !== "districts") {
      return;
    }
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
        {activeLayer === "districts" ? (
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
        ) : (
          <LeftPrecinctPanel
            data={precincts}
            onSelectFeature={onSelectFeature}
            onChangeBorderForHoverOverDistrict={
              onChangeBorderForHoverOverDistrict
            }
            onChangeLeftHoverOverDistrict={onChangeLeftHoverOverDistrict}
            selectedRace={selectedRace}
            setSelectedRace={setSelectedRace}
          />
        )}
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

            <div
              className="custom-layer-controls"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <button
                onClick={() => setActiveLayer("districts")}
                style={{
                  margin: "5px",
                  padding: "10px",
                  backgroundColor:
                    activeLayer === "districts" ? "#007bff" : "#ccc",
                  color: "#fff",
                }}
              >
                Districts
              </button>
              <button
                onClick={() => setActiveLayer("precincts")}
                style={{
                  margin: "5px",
                  padding: "10px",
                  backgroundColor:
                    activeLayer === "precincts" ? "#007bff" : "#ccc",
                  color: "#fff",
                }}
              >
                Precincts
              </button>
              <button
                onClick={() => setActiveLayer("MMD")}
                style={{
                  margin: "5px",
                  padding: "10px",
                  backgroundColor: activeLayer === "MMD" ? "#007bff" : "#ccc",
                  color: "#fff",
                }}
              >
                View MMD
              </button>
              <button
                onClick={() => setActiveLayer("SMD")}
                style={{
                  margin: "5px",
                  padding: "10px",
                  backgroundColor: activeLayer === "SMD" ? "#007bff" : "#ccc",
                  color: "#fff",
                }}
              >
                View SMD
              </button>
            </div>

            {activeLayer === "districts" && congressionalDistricts && (
              <GeoJSON
                ref={geoJsonRef} // Set reference to GeoJSON layer
                data={congressionalDistricts}
                style={styleDistricts}
                onEachFeature={showDistrictData}
              />
            )}

            {activeLayer === "MMD" && utGeo && (
              <GeoJSON
                data={utGeo}
                style={styleElection} // Use dynamic styling for each feature
                onEachFeature={showUTData}
              />
            )}

            {activeLayer === "SMD" && congressionalDistricts && (
              <GeoJSON
                data={congressionalDistricts}
                style={styleElection} // Use dynamic styling for each feature
                onEachFeature={showDistrictData}
              />
            )}

            {activeLayer === "precincts" && precincts && (
              <GeoJSON
                data={precincts}
                style={stylePrecincts}
                onEachFeature={showPopulationData}
              />
            )}

            <ZoomControl position="bottomright" />
          </MapContainer>
        </div>
      </div>
    </>
  );
};

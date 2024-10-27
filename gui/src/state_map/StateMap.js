import React, { useEffect, useState, useRef, useCallback } from "react";
import { getCurrentDistrictPlans, getPrecincts } from "../axiosClient";
import { MapContainer, TileLayer, GeoJSON, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css"
import { LeftDataPanel } from "./LeftDataPanel";
import { MAPBOX_ACCESS_TOKEN, COLORS, colorScale, colorScaleRed, colorScaleBlue, centerOfTheUS, defaultZoom, defaultMinZoom } from "../utils/Constants";
import { CurrentDistrictPlansProperties, CurrentDistrictPlansFeatureProperties, PrecinctsFeatureProperties } from "../utils/MongoDocumentProperties";
import { getDistrictDataPopupContent, getPrecinctDataPopupContent } from "./PopupStyling";

export const StateMap = ({ state }) => {
  const [congressionalDistricts, setCongressionalDistricts] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [districtColors, setDistrictColors] = useState({});
  const [precincts, setPrecincts] = useState(null);
  const [selectedDataColumn, setSelectedDataColumn] = useState("");
  const [activeLayer, setActiveLayer] = useState("districts");
  const [mapCenter, setMapCenter] = useState(centerOfTheUS);
  const [mapZoom, setMapZoom] = useState(defaultZoom);
  const [mapMinZoom, setMapMinZoom] = useState(defaultMinZoom);
  const geoJsonRefDistricts = useRef();
  const geoJsonRefPrecincts = useRef();
  const mapRef = useRef();

  useEffect(() => {
    const loadCurrentDistrictPlans = async () => {
      try {
        const currentDistrictPlans = await getCurrentDistrictPlans(state);

        setMapCenter(currentDistrictPlans[CurrentDistrictPlansProperties.center]);
        setMapZoom(currentDistrictPlans[CurrentDistrictPlansProperties.zoom]);
        setMapMinZoom(currentDistrictPlans[CurrentDistrictPlansProperties.minZoom]);

        setCongressionalDistricts(currentDistrictPlans);
        const colorsForDistricts = {}

        currentDistrictPlans.features.forEach((feature, index) => {
          const district = feature.properties.district;
          colorsForDistricts[district] = {
            color: "black", // outline
            fillColor: COLORS[index],
            fillOpacity: 0.6
          };
        });

        setDistrictColors(colorsForDistricts);
      } catch (error) {
        console.error("Failed to load current plans:", error.message);
      }
    }

    loadCurrentDistrictPlans();

    const loadPrecincts = async () => {
      try {
        const precincts = await getPrecincts(state);
        setPrecincts(precincts);
      } catch (error) {
        console.error("Failed to load precincts:", error.message);
      }
    }

    loadPrecincts();
  }, [state]);

  const setStyleForPrecinctSelection = useCallback((feature) => {
    let totalPop = feature.properties[PrecinctsFeatureProperties.population];
    const racePop = feature.properties[selectedDataColumn];
    if (selectedDataColumn === PrecinctsFeatureProperties.republican || selectedDataColumn === PrecinctsFeatureProperties.democrat) {
      totalPop =
        feature.properties[PrecinctsFeatureProperties.republican] + feature.properties[PrecinctsFeatureProperties.democrat];
    }
    const percent = totalPop > 0 ? (racePop / totalPop) * 100 : 0;

    //fill the colors based on the racial demogprahic percentage
    let fillColor = colorScale(percent).hex();
    let selectedOutlineColor = colorScale(percent).hex();

    if (selectedDataColumn === "") {
      fillColor = "#ffff";
      selectedOutlineColor = "#0000";
    } else if (selectedDataColumn === PrecinctsFeatureProperties.republican) {
      fillColor = colorScaleRed(percent).hex();
      selectedOutlineColor = colorScaleBlue(percent).hex();
    } else if (selectedDataColumn === PrecinctsFeatureProperties.democrat) {
      fillColor = colorScaleBlue(percent).hex();
      selectedOutlineColor = colorScaleRed(percent).hex();
    }

    return {
      color: selectedOutlineColor,
      fillColor: fillColor,
      weight: 5,
      fillOpacity: 0.7,
    };
  },[selectedDataColumn]);

  // Zoom to selected feature
  useEffect(() => {
    if (selectedFeature && geoJsonRefDistricts.current && mapRef.current) {
      const layer = geoJsonRefDistricts.current
        .getLayers()
        .find(
          (l) =>
            l.feature.properties.district ===
            selectedFeature.properties.district
        );
      if (layer) {
        const bounds = layer.getBounds();

        mapRef.current.fitBounds(bounds);
      }
    } else if (
      selectedFeature &&
      geoJsonRefPrecincts.current &&
      mapRef.current
    ) {
      const layer = geoJsonRefPrecincts.current
        .getLayers()
        .find(
          (l) =>
            l.feature.properties.district ===
            selectedFeature.properties.district
        );
      if (layer) {
        const bounds = layer.getBounds();
        layer.setStyle(setStyleForPrecinctSelection(layer.feature))
        mapRef.current.fitBounds(bounds);
      }
    }
  }, [selectedFeature, setStyleForPrecinctSelection]);

  const styleDistricts = (feature) => {
    if (selectedDataColumn === "") {
      const district = feature.properties.district;

      return {
        color: districtColors[district].color, // border color for each district
        fillColor: districtColors[district].fillColor, // unique color for the district
        weight: 2,
        fillOpacity: districtColors[district].fillOpacity,
      };
    } else {
      const totalPop = feature.properties.population;
      const racePop = feature.properties[selectedDataColumn];
      const percent = totalPop > 0 ? (racePop / totalPop) * 100 : 0;

      //fill teh colors based on the racial demogprahic percentage
      let fillColor = colorScale(percent).hex();

      if (selectedDataColumn === CurrentDistrictPlansFeatureProperties.republican) {
        fillColor = colorScaleRed(percent).hex();
      } else if (selectedDataColumn === CurrentDistrictPlansFeatureProperties.democrat) {
        fillColor = colorScaleBlue(percent).hex();
      }

      return {
        color: "black",
        fillColor: fillColor,
        weight: 1,
        fillOpacity: 0.7,
      };
    }
  };

  useEffect(() => {
    if (mapRef.current && mapCenter && mapZoom) {
      mapRef.current.setView(mapCenter, mapZoom);
    }
  }, [mapCenter, mapZoom]);

  const showDistrictData = (feature, layer) => {
    const popupContent = getDistrictDataPopupContent(feature);
    layer.bindPopup(popupContent);
  }

  const showPrecinctData = (feature, layer) => {
    const popupContent = getPrecinctDataPopupContent(feature);
    layer.bindPopup(popupContent);
  }

  const stylePrecincts =(feature) => {
    let totalPop = feature.properties[PrecinctsFeatureProperties.population];
    const racePop = feature.properties[selectedDataColumn];
    if (selectedDataColumn === PrecinctsFeatureProperties.republican || selectedDataColumn === PrecinctsFeatureProperties.democrat) {
      totalPop =
        feature.properties[PrecinctsFeatureProperties.republican] + feature.properties[PrecinctsFeatureProperties.democrat];
    }
    const percent = totalPop > 0 ? (racePop / totalPop) * 100 : 0;

    //fill teh colors based on the racial demogprahic percentage
    let fillColor = colorScale(percent).hex();

    if (selectedDataColumn === "") {
      fillColor = "white";
    } else if (selectedDataColumn === PrecinctsFeatureProperties.republican) {
      fillColor = colorScaleRed(percent).hex();
    } else if (selectedDataColumn === PrecinctsFeatureProperties.democrat) {
      fillColor = colorScaleBlue(percent).hex();
    }

    return {
      color: "black",
      fillColor: fillColor,
      weight: 1,
      fillOpacity: 0.7,
    };
  }

  const onSelectFeature = (feature) => {
    setSelectedFeature(feature);
  }

  const onChangeBorderForHoverOverDistrict = (district) => {
    if (activeLayer !== "districts") {
      return;
    }
    setDistrictColors((prevColors) => {
      return {
        ...prevColors,
        [district]: {
          color: prevColors[district].fillColor,
          fillColor: prevColors[district].fillColor,
          fillOpacity: 0.8,
        },
      };
    });
  }

  const onChangeLeftHoverOverDistrict = (district_number) => {
    if (activeLayer !== "districts") {
      return;
    }
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
          <LeftDataPanel
          data={congressionalDistricts}
          onSelectFeature={onSelectFeature}
          districtColors={districtColors}
          onChangeBorderForHoverOverDistrict={onChangeBorderForHoverOverDistrict}
          onChangeLeftHoverOverDistrict={onChangeLeftHoverOverDistrict}
          selectedDataColumn={selectedDataColumn}
          setSelectedDataColumn={setSelectedDataColumn}
          />
        <div className="map-container">
          <MapContainer
            center={mapCenter} //center on texas coords
            zoom={mapZoom}
            minZoom={mapMinZoom}
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
            </div>

            {activeLayer === "districts" && congressionalDistricts && (
              <GeoJSON
                ref={geoJsonRefDistricts} // Set reference to GeoJSON layer
                data={congressionalDistricts}
                style={styleDistricts}
                onEachFeature={showDistrictData}
              />
            )}

            {activeLayer === "precincts" && precincts && (
              <GeoJSON
                data={precincts}
                ref={geoJsonRefPrecincts}
                style={stylePrecincts}
                onEachFeature={showPrecinctData}
              />
            )}

            <ZoomControl position="bottomright" />
          </MapContainer>
        </div>
      </div>
    </>
  )
}
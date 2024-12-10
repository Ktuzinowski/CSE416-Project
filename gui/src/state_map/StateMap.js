import React, { useEffect, useState, useRef, useCallback } from "react";
import { getCurrentDistrictPlans, getPrecincts } from "../axiosClient";
import { MapContainer, TileLayer, GeoJSON, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css"
import { LeftDataPanel } from "./LeftDataPanel";
import { MAPBOX_ACCESS_TOKEN, COLORS, colorScale, colorScaleRed, colorScaleBlue, centerOfTheUS, defaultZoom, defaultMinZoom, BoundaryChoroplethOptions, ViewDataOptions} from "../utils/Constants";
import { CurrentDistrictPlansProperties, CurrentDistrictPlansFeatureProperties, PrecinctsFeatureProperties } from "../utils/MongoDocumentProperties";
import { getDistrictDataPopupContent, getPrecinctDataPopupContent } from "./PopupStyling";
import { MapFilter } from "./MapFilter";
import { RightAnalysisPanel } from "./RightAnalysisPanel"

export const StateMap = ({ state }) => {
  const [congressionalDistricts, setCongressionalDistricts] = useState(null);
  const [smdDistricts, setSmdDistricts] = useState(null);
  const [mmdDistricts, setMmdDistricts] = useState(null);

  const [congressionalDistrictColors, setCongressionalDistrictColors] = useState({});
  const [smdDistrictColors, setSmdDistrictColors] = useState({}); 
  const [mmdDistrictColors, setMmdDistrictColors] = useState({});

  const [precincts, setPrecincts] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [selectedDataColumn, setSelectedDataColumn] = useState("");

  const [showCurrentDistrictPlan, setShowCurrentDistrictPlan] = useState(true);
  const [showPrecincts, setShowPrecincts] = useState(false);
  const [showSMD, setShowSMD] = useState(false);
  const [showMMD, setShowMMD] = useState(false);
  const [mapCenter, setMapCenter] = useState(centerOfTheUS);
  const [mapZoom, setMapZoom] = useState(defaultZoom);
  const [mapMinZoom, setMapMinZoom] = useState(defaultMinZoom);
  const [isLeftDataPanelExpanded, setIsLeftDataPanelExpanded] = useState(false);
  const [isRightAnalysisPanelExpanded, setIsRightAnalysisPanelExpanded] = useState(false);

  const [choroplethBoundarySelection, setChoroplethBoundarySelection] = useState(BoundaryChoroplethOptions.Current);

  const [selectedDataViewOption, setSelectedDataViewOption] = useState(null);

  const geoJsonRefCurrentDistricts = useRef();
  const geoJsonRefSmdDistricts = useRef();
  const geoJsonRefMmdDistricts = useRef();
  const geoJsonRefPrecincts = useRef();
  const mapRef = useRef();

  useEffect(() => {
    const loadCurrentDistrictPlans = async (state) => {
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

        setCongressionalDistrictColors(colorsForDistricts);

        return currentDistrictPlans.features.length;
      } catch (error) {
        console.error("Failed to load current plans:", error.message);
        return 0;
      }
    }

    const loadSmdDistrictPlans = async (lengthOfPreviousDistricts) => {
      try {
        const state_smd = `${state}_smd`
        const smdDistrictPlans = await getCurrentDistrictPlans(state_smd);

        setSmdDistricts(smdDistrictPlans);
        const colorsForDistricts = {}

        smdDistrictPlans.features.forEach((feature, index) => {
          const district = feature.properties.district;
          colorsForDistricts[district] = {
            color: "black", // outline
            fillColor: COLORS[lengthOfPreviousDistricts + index],
            fillOpacity: 0.6
          };
        });

        setSmdDistrictColors(colorsForDistricts);
      } catch (error) {
        console.error("Failed to load current plans:", error.message);
      }
    }

    const loadMmdDistrictPlans = async (lengthOfPreviousDistricts) => {
      try {
        const state_mmd = `${state}_mmd`
        const mmdDistrictPlans = await getCurrentDistrictPlans(state_mmd);

        setMmdDistricts(mmdDistrictPlans);
        const colorsForDistricts = {}

        mmdDistrictPlans.features.forEach((feature, index) => {
          const district = feature.properties.district;
          colorsForDistricts[district] = {
            color: "black", // outline
            fillColor: COLORS[lengthOfPreviousDistricts + index],
            fillOpacity: 0.6
          };
        });

        setMmdDistrictColors(colorsForDistricts);
      } catch (error) {
        console.error("Failed to load current plans:", error.message);
      }
    }

    // Ensure follows this order since they increasingly select
    // colors from the array of colors COLORS
    const loadAllDistrictPlans = async () => {
      const lengthOfFeaturesForCurrentDistrictPlan = await loadCurrentDistrictPlans(state);
      const lengthOfFeaturesForSmdDistrictPlan = await loadSmdDistrictPlans(lengthOfFeaturesForCurrentDistrictPlan);
      await loadMmdDistrictPlans(lengthOfFeaturesForSmdDistrictPlan + lengthOfFeaturesForCurrentDistrictPlan);
    }
    loadAllDistrictPlans();

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

  useEffect(() => {
    if (mapRef.current && mapCenter && mapZoom) {
      mapRef.current.setView(mapCenter, mapZoom);
    }
  }, [mapCenter, mapZoom]);

  // Zoom to selected feature
  useEffect(() => {
    if (selectedDataViewOption === ViewDataOptions.Current && selectedFeature && geoJsonRefCurrentDistricts.current && mapRef.current) {
      const layer = geoJsonRefCurrentDistricts.current
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
    } 
    else if (selectedDataViewOption === ViewDataOptions.SMD && selectedFeature && geoJsonRefSmdDistricts.current && mapRef.current) {
      const layer = geoJsonRefSmdDistricts.current
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
    }
    else if (selectedDataViewOption === ViewDataOptions.MMD && selectedFeature && geoJsonRefMmdDistricts.current && mapRef.current) {
      const layer = geoJsonRefMmdDistricts.current
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
    }
    else if (
      selectedDataViewOption === ViewDataOptions.Precincts &&
      geoJsonRefPrecincts.current &&
      mapRef.current
    ) {
      const layer = geoJsonRefPrecincts.current
        .getLayers()
        .find(
          (l) =>
            l.feature.properties.precinct ===
            selectedFeature.properties.precinct
        );
      if (layer) {
       
        const bounds = layer.getBounds();
        layer.setStyle(setStyleForPrecinctSelection(layer.feature))
        mapRef.current.fitBounds(bounds);
      }
    }
  }, [selectedFeature, selectedDataViewOption, setStyleForPrecinctSelection]);

  const styleDistricts = (boundary, districtColors, feature) => {
    const district = feature.properties.district;

    if (selectedDataColumn === "") {

      return {
        color: choroplethBoundarySelection === boundary ? districtColors[district].color : districtColors[district].fillColor, // border color for each district
        fillColor: districtColors[district].fillColor, // unique c
        weight: choroplethBoundarySelection === boundary ? 2 : 4,
        fillOpacity: choroplethBoundarySelection === boundary ? districtColors[district].fillOpacity : 0.2,
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
        color: choroplethBoundarySelection === boundary ? "black" : districtColors[district].fillColor,
        fillColor: choroplethBoundarySelection === boundary ? fillColor : districtColors[district].fillColor,
        weight: choroplethBoundarySelection === boundary ? 1 : 3,
        fillOpacity: choroplethBoundarySelection === boundary ? 0.8 : 0.2,
      };
    }
  };

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
      fillColor: choroplethBoundarySelection === BoundaryChoroplethOptions.Precincts ? fillColor : "white",
      fillOpacity: 0.8,
      weight: 0.8
    };
  }

  const onSelectFeature = (dataViewOption, feature) => {
    setSelectedFeature(feature);
    setSelectedDataViewOption(dataViewOption);
  }

  const onChangeBorderForHoverOverDistrict = (currentDataView, district) => {
    if (showCurrentDistrictPlan && currentDataView === ViewDataOptions.Current) {
      setCongressionalDistrictColors((prevColors) => {
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
    else if (showSMD && currentDataView === ViewDataOptions.SMD) {
      setSmdDistrictColors((prevColors) => {
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
    else if (showMMD && currentDataView === ViewDataOptions.MMD) {
      setMmdDistrictColors((prevColors) => {
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
  }

  const onChangeLeftHoverOverDistrict = (currentDataView, district_number) => {
    if (showCurrentDistrictPlan && currentDataView === ViewDataOptions.Current) {
      setCongressionalDistrictColors((prevColors) => {
        return {
          ...prevColors,
          [district_number]: {
            color: "black",
            fillColor: prevColors[district_number].fillColor,
            fillOpacity: 0.6,
          },
        };
      });
    }
    else if (showSMD && currentDataView === ViewDataOptions.SMD) {
      setSmdDistrictColors((prevColors) => {
        return {
          ...prevColors,
          [district_number]: {
            color: "black",
            fillColor: prevColors[district_number].fillColor,
            fillOpacity: 0.6,
          },
        };
      });
    }
    else if (showMMD && currentDataView === ViewDataOptions.MMD) {
      setMmdDistrictColors((prevColors) => {
        return {
          ...prevColors,
          [district_number]: {
            color: "black",
            fillColor: prevColors[district_number].fillColor,
            fillOpacity: 0.6,
          },
        };
      });
    }
  };


  return (
    <>
      <div className="map-wrapper">
          {!isRightAnalysisPanelExpanded && <LeftDataPanel
          districtData={congressionalDistricts}
          smdData={smdDistricts}
          mmdData={mmdDistricts}
          precinctData={precincts}
          onSelectFeature={onSelectFeature}
          congressionalDistrictColors={congressionalDistrictColors}
          smdDistrictColors={smdDistrictColors}
          mmdDistrictColors={mmdDistrictColors}
          onChangeBorderForHoverOverDistrict={onChangeBorderForHoverOverDistrict}
          onChangeLeftHoverOverDistrict={onChangeLeftHoverOverDistrict}
          selectedDataColumn={selectedDataColumn}
          setSelectedDataColumn={setSelectedDataColumn}
          setIsLeftDataPanelExpanded={setIsLeftDataPanelExpanded}
          choroplethBoundarySelection={choroplethBoundarySelection}
          setChoroplethBoundarySelection={setChoroplethBoundarySelection}
          />}
        <div className="map-container">
          {!isLeftDataPanelExpanded && !isRightAnalysisPanelExpanded && <MapFilter showCurrent={showCurrentDistrictPlan} setShowCurrent={setShowCurrentDistrictPlan} showSMD={showSMD} setShowSMD={setShowSMD} showMMD={showMMD} setShowMMD={setShowMMD} showPrecincts={showPrecincts} setShowPrecincts={setShowPrecincts} />}
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

            {showCurrentDistrictPlan && congressionalDistricts && (
              <GeoJSON
                ref={geoJsonRefCurrentDistricts} // Set reference to GeoJSON layer
                data={congressionalDistricts}
                style={(feature) => styleDistricts(BoundaryChoroplethOptions.Current, congressionalDistrictColors, feature)}
                onEachFeature={showDistrictData}
              />
            )}

            {showSMD && smdDistricts && (
              <GeoJSON
                ref={geoJsonRefSmdDistricts} // Set reference to GeoJSON layer
                data={smdDistricts}
                style={(feature) => styleDistricts(BoundaryChoroplethOptions.SMD, smdDistrictColors, feature)}
                onEachFeature={showDistrictData}
              />
            )}

            {showMMD && mmdDistricts && (
              <GeoJSON
              ref={geoJsonRefMmdDistricts} // Set reference to GeoJSON layer
              data={mmdDistricts}
              style={(feature) => styleDistricts(BoundaryChoroplethOptions.MMD, mmdDistrictColors, feature)}
              onEachFeature={showDistrictData}
              />
            )}

            {showPrecincts && precincts && (
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
        {!isLeftDataPanelExpanded && <RightAnalysisPanel setIsRightAnalysisPanelExpanded={setIsRightAnalysisPanelExpanded} state={state} />}
      </div>
    </>
  )
}
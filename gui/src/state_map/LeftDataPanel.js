import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpandAlt, faCompressAlt } from '@fortawesome/free-solid-svg-icons';
import Icon from "../utils/Icon";
import "../App.css";
import { PrecinctsFeatureProperties, CurrentDistrictPlansFeatureProperties } from "../utils/MongoDocumentProperties";
import { COLORS, colorScale, colorScaleRed, colorScaleBlue, centerOfTheUS, defaultZoom, defaultMinZoom, BoundaryChoroplethOptions, ViewDataOptions} from "../utils/Constants";


export const LeftDataPanel = ({ districtData, smdData, mmdData, precinctData, onSelectFeature, congressionalDistrictColors, smdDistrictColors, mmdDistrictColors, onChangeBorderForHoverOverDistrict, onChangeLeftHoverOverDistrict, selectedDataColumn, setSelectedDataColumn, setIsLeftDataPanelExpanded, choroplethBoundarySelection, setChoroplethBoundarySelection }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [columnNames, setColumnNames] = useState(null);
    const [pinnedColumns, setPinnedColumns] = useState({}); // Track pinned columns
    const [selectedFeature, setSelectedFeature] = useState(null); // Local state to track the selected feature
    const [displayAnalysisScreen, setDisplayAnalysisScreen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentDataView, setCurrentDataView] = useState(ViewDataOptions.Current);

    useEffect(() => {
        if (districtData !== null && precinctData !== null && smdData !== null && mmdData !== null) {
            if (currentDataView === ViewDataOptions.Current) {
                const keys = ["index", ...Object.keys(CurrentDistrictPlansFeatureProperties)];
                setColumnNames(keys);
                setPinnedColumns(keys.reduce((acc, key) => ({ ...acc, [key]: false }), {}));
            }
            else if (currentDataView === ViewDataOptions.SMD) {
                const keys = ["index", ...Object.keys(CurrentDistrictPlansFeatureProperties)];
                setColumnNames(keys);
                setPinnedColumns(keys.reduce((acc, key) => ({ ...acc, [key]: false }), {}));
            }
            else if (currentDataView === ViewDataOptions.MMD) {
                const keys = ["index", ...Object.keys(CurrentDistrictPlansFeatureProperties)];
                setColumnNames(keys);
                setPinnedColumns(keys.reduce((acc, key) => ({ ...acc, [key]: false }), {}));
            }
            else {
                const keys = ["index", ...Object.keys(PrecinctsFeatureProperties)]
                setColumnNames(keys);
                setPinnedColumns(keys.reduce((acc, key) => ({ ...acc, [key]: false }), {}));
            }
        }
    }, [districtData, precinctData, currentDataView]);

    const togglePanel = () => {
        setDisplayAnalysisScreen(false);
        setIsExpanded(!isExpanded);
        setIsLeftDataPanelExpanded(!isExpanded);
    }

    const togglePin = (column) => {
        setPinnedColumns((prev) => ({
            ...prev,
            [column]: !prev[column]
        }))
    }

    const handleFeatureSelect = (feature) => {
        setSelectedFeature(feature);
    }

    const handleHoverOverRowOfData = (feature) => {
        if (currentDataView !== ViewDataOptions.Precincts) {
            onChangeBorderForHoverOverDistrict(currentDataView, feature.properties.district)
        }
    }

    const handleLeaveHoverOverData = (feature) => {
        if (currentDataView !== ViewDataOptions.Precincts) {
            onChangeLeftHoverOverDistrict(currentDataView, feature.properties.district)
        }
    }

    useEffect(() => {
        if (selectedFeature) {
            onSelectFeature(currentDataView, selectedFeature);
        }
    }, [selectedFeature, onSelectFeature]);

    const getVisibleColumns = () => {
        if (isExpanded) {
            return columnNames;
        }
        else {
            const filtered_column_names = columnNames.filter((key) => key === "index" || pinnedColumns[key]);
            if (filtered_column_names.length === 1) {
                return [columnNames[0], columnNames[1], columnNames[2], columnNames[3]] // just get two columns at least to display
            }
            return filtered_column_names
        }
    }

    // LEGEND STUFF
const Legend = ({ selectedColumn }) => {
    const getColorScale = () => {
        if (selectedColumn === CurrentDistrictPlansFeatureProperties.democrat) {
            return colorScaleBlue;
        } else if (selectedColumn === CurrentDistrictPlansFeatureProperties.republican) {
            return colorScaleRed;
        } else if (
            selectedColumn === CurrentDistrictPlansFeatureProperties.white ||
            selectedColumn === CurrentDistrictPlansFeatureProperties.black ||
            selectedColumn === CurrentDistrictPlansFeatureProperties.hispanic ||
            selectedColumn === CurrentDistrictPlansFeatureProperties.asian ||
            selectedColumn === CurrentDistrictPlansFeatureProperties.pacific ||
            selectedColumn === CurrentDistrictPlansFeatureProperties.indigenous ||
            selectedColumn === CurrentDistrictPlansFeatureProperties.other
        ) {
            return colorScale;
        }
        return null; // No color scale if it's not one of the race or party columns
    };

    const currentColorScale = getColorScale();

    if (!currentColorScale) {
        return null; // Don't render legend if selectedColumn is not related to race or party
    }

    const gradientColors = [];
    for (let i = 0; i <= 100; i += 10) {
        gradientColors.push(currentColorScale(i).hex());
    }

    return (
        <div className="legend">
            <h4>Population Percentage</h4>
            <div className="legend-bar">
                {gradientColors.map((color, index) => (
                    <span
                        key={index}
                        style={{
                            background: color,
                            flex: 1,
                            height: "15px",
                        }}
                    ></span>
                ))}
            </div>
            <div className="legend-labels">
                {[...Array(11).keys()].map((value) => (
                    <span key={value}>{value * 10}%</span>
                ))}
            </div>
        </div>
    );
};
// END OF LEGEND STUFF
    
    return (
        <div className="container_left_data_panel" style={{
            width: isExpanded ? "100%" : "auto", // Auto-width when collapsed
            maxWidth: isExpanded ? "100%" : "fit-content", // Fit the content naturally
            minWidth: "200px", // Set a minimum width for the panel
            paddingBottom: "35px"
        }}>
            <div className="left_data_panel_current_selection">
                <h2 className="left_data_panel_title">{currentDataView === ViewDataOptions.Current ? "Current District Plan" : currentDataView}</h2>
                <button className="left_data_expand_button" onClick={togglePanel}>
                    <FontAwesomeIcon icon={isExpanded ? faCompressAlt : faExpandAlt} />
                </button>
            </div>

            {!displayAnalysisScreen && (
            <>
            <div style={{ marginBottom: "20px" }}>
                <label className="dropdown_styling" htmlFor="race-select"> Choropleth Map</label>
                <select
                    value={choroplethBoundarySelection}
                    onChange={(e) => setChoroplethBoundarySelection(e.target.value)}
                    style={{marginLeft: "10px", fontSize: "15px", padding: "1px", marginRight: "10px"}}
                >
                    <option value={`${BoundaryChoroplethOptions.Current}`}>Current</option>
                    <option value={`${BoundaryChoroplethOptions.SMD}`}>SMD</option>
                    <option value={`${BoundaryChoroplethOptions.MMD}`}>MMD</option>
                    <option value={`${BoundaryChoroplethOptions.Precincts}`}>Precincts</option>
                </select>
                <select
                    value={selectedDataColumn}
                    onChange={(e) => setSelectedDataColumn(e.target.value)}
                    style={{fontSize:"15px", padding: "1px", marginRight: "10px"}}
                >   
                    <option value="">Default</option>
                    <option value={`${CurrentDistrictPlansFeatureProperties.republican}`}>Republican</option>
                    <option value={`${CurrentDistrictPlansFeatureProperties.democrat}`}>Democrat</option>
                    <option value={`${CurrentDistrictPlansFeatureProperties.white}`}>White</option>
                    <option value={`${CurrentDistrictPlansFeatureProperties.black}`}>Black</option>
                    <option value={`${CurrentDistrictPlansFeatureProperties.hispanic}`}>Hispanic</option>
                    <option value={`${CurrentDistrictPlansFeatureProperties.asian}`}>Asian</option>
                    <option value={`${CurrentDistrictPlansFeatureProperties.pacific}`}>Pacific </option>
                    <option value={`${CurrentDistrictPlansFeatureProperties.indigenous}`}>Indigenous </option>
                    <option value={`${CurrentDistrictPlansFeatureProperties.other}`}>Other</option>
                </select>
            </div>
            <div style={{marginBottom: "20px"}}>
                <label className="dropdown_styling">View Data</label>
                <select
                    value={currentDataView}
                    onChange={(e) => setCurrentDataView(e.target.value)}
                    style={{marginLeft: "10px", fontSize:"15px", padding: "1px", marginRight: "10px"}}
                >   
                    <option value={`${ViewDataOptions.Current}`}>Current</option>
                    <option value={`${ViewDataOptions.SMD}`}>SMD</option>
                    <option value={`${ViewDataOptions.MMD}`}>MMD</option>
                    <option value={`${ViewDataOptions.Precincts}`}>Precincts</option>
                </select>

                {selectedDataColumn && (
                    <Legend selectedColumn={selectedDataColumn} />
                )}
            </div>

            
            {
                currentDataView === ViewDataOptions.Precincts &&
                (
                    <div className="search_for_precinct_name">
                        <input
                        type="text"
                        placeholder="Search Precincts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ width: "200px", padding: "5px", margin: "5px" }}
                        />
                    </div>
                )
            }


            <hr style={{ width: "100%", border: "1px solid #ccc", marginTop: "-5px" }} />

            {columnNames && (
                <div className="left_data_table">
                    <table className="left_data_column_names">
                        <thead>
                            <tr>
                                {getVisibleColumns().map((key) => (
                                    <th key={key} className="left_data_column_header">
                                        {key.charAt(0).toUpperCase() + key.slice(1)}
                                        {key !== "index" && isExpanded && (
                                            <span className="pin-icon" onClick={() => togglePin(key)} size={1.1}>
                                                <Icon name={pinnedColumns[key] ? "thumbtack-solid" : "thumbtack"} />
                                            </span>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {districtData && precinctData && smdData && mmdData && (currentDataView === ViewDataOptions.Current ? districtData.features : currentDataView === ViewDataOptions.SMD ? smdData.features : currentDataView === ViewDataOptions.MMD ? mmdData.features : precinctData.features.filter((feature) => {
                                // Get the precinct name and check if it includes the search query
                                if (feature.properties[PrecinctsFeatureProperties.precinct]) {
                                    const precinctName = feature.properties[PrecinctsFeatureProperties.precinct].toLowerCase();
                                    return precinctName.includes(searchQuery.toLowerCase());
                                } else {
                                    if (searchQuery === "") {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                }
                            }).slice(0, 40))
                            .map((feature, index) => {
                               return (
                                <tr key={index} onMouseEnter={() => handleHoverOverRowOfData(feature)} onMouseLeave={() => handleLeaveHoverOverData(feature)}>
                                    {getVisibleColumns().map((key, idx) => {
                                        if (!isExpanded && key === "index") {
                                            return (
                                                <td key={idx} style={{textAlign: "left", display: "flex", justifyContent: "space-between"}}>
                                                    {
                                                        currentDataView !== ViewDataOptions.Precincts &&
                                                        (
                                                            <span>
                                                                    <Icon name="roundedSquare" size={1.2} color={currentDataView === ViewDataOptions.Current ? congressionalDistrictColors[feature.properties.district].fillColor : currentDataView === ViewDataOptions.SMD ? smdDistrictColors[feature.properties.district].fillColor : mmdDistrictColors[feature.properties.district].fillColor} borderWidth={"1px"} borderColor={"black"} />
                                                            </span>
                                                        )
                                                    }
                                                    <span className="zoom-icon" onClick={() => handleFeatureSelect(feature)}>
                                                            <Icon name="search" size={1.1}/>
                                                   </span>
                                                </td>
                                                
                                            )
                                        }
                                        else if (key === "index") {
                                            return (
                                                <td key={idx} style={{textAlign: "right"}}>
                                                    {index}
                                                </td>
                                            )
                                        }
                                        return (
                                            <td key={idx} style={{ textAlign: "right" }}>
                                                {feature.properties[key]
                                                    ? typeof feature.properties[key] === "number"
                                                        ? feature.properties[key].toLocaleString()
                                                        : feature.properties[key].toString()
                                                    : ""}
                                            </td>
                                        );
                                    })}
                                </tr>
                               )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
                </>
            )}
        </div>
    )
}
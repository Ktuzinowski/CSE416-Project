import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpandAlt, faCompressAlt } from '@fortawesome/free-solid-svg-icons';
import Icon from "../utils/Icon";
import "../App.css";
import { PrecinctsFeatureProperties, CurrentDistrictPlansFeatureProperties } from "../utils/MongoDocumentProperties";
import { ActiveLayers } from "../utils/Constants"

export const LeftDataPanel = ({ districtData, precinctData, activeLayer, onSelectFeature, districtColors, onChangeBorderForHoverOverDistrict, onChangeLeftHoverOverDistrict, selectedDataColumn, setSelectedDataColumn }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [columnNames, setColumnNames] = useState(null);
    const [pinnedColumns, setPinnedColumns] = useState({}); // Track pinned columns
    const [selectedFeature, setSelectedFeature] = useState(null); // Local state to track the selected feature
    const [displayAnalysisScreen, setDisplayAnalysisScreen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isToggled, setIsToggled] = useState(true);

    useEffect(() => {
        if (districtData !== null && precinctData !== null) {
            if (activeLayer === ActiveLayers.Districts) {
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
    }, [districtData, precinctData, activeLayer]);

    const togglePanel = () => {
        setDisplayAnalysisScreen(false);
        setIsExpanded(!isExpanded);
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
        onChangeBorderForHoverOverDistrict(feature.properties.district)
    }

    const handleLeaveHoverOverData = (feature) => {
        onChangeLeftHoverOverDistrict(feature.properties.district)
    }

    useEffect(() => {
        if (selectedFeature) {
            onSelectFeature(selectedFeature);
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

    const onAnalysisScreenButtonClick = () => {
        setDisplayAnalysisScreen(true)
        setIsExpanded(true)
    }

    return (
        <div className="container_left_data_panel" style={{
            width: isExpanded ? "100%" : "auto", // Auto-width when collapsed
            maxWidth: isExpanded ? "100%" : "fit-content", // Fit the content naturally
            minWidth: "200px", // Set a minimum width for the panel
            paddingBottom: "35px"
        }}>
            <div className="left_data_panel_current_selection">
                <h2 className="left_data_panel_title">{activeLayer === ActiveLayers.Districts ? "Congressional Districts" : "Precincts"}</h2>
                <button className="left_data_expand_button" onClick={togglePanel}>
                    <FontAwesomeIcon icon={isExpanded ? faCompressAlt : faExpandAlt} />
                </button>
            </div>

            {!displayAnalysisScreen && (
            <>
            <div style={{ marginBottom: "20px" }}>
                <label className="dropdown_for_choropleth" htmlFor="race-select"> Choropleth Map</label>
                <select
                    id="race-select"
                    value={selectedDataColumn}
                    onChange={(e) => setSelectedDataColumn(e.target.value)}
                    style={{marginLeft: "10px", fontSize:"15px", padding: "1px", marginRight: "10px"}}
                >   
                    <option value="">Default</option>
                    <option value={`${CurrentDistrictPlansFeatureProperties.republican}`}>Republican</option>
                    <option value={`${CurrentDistrictPlansFeatureProperties.democrat}`}>Democrat</option>
                    <option value={`${CurrentDistrictPlansFeatureProperties.white}`}>White</option>
                    <option value={`${CurrentDistrictPlansFeatureProperties.black}`}>Black</option>
                    <option value={`${CurrentDistrictPlansFeatureProperties.hispanic}`}>Hispanic</option>
                    <option value={`${CurrentDistrictPlansFeatureProperties.asian}`}>Asian</option>
                    <option value={`${CurrentDistrictPlansFeatureProperties.pacific}`}>Pacific </option>
                    <option value={`${CurrentDistrictPlansFeatureProperties.native}`}>Native </option>
                    <option value={`${CurrentDistrictPlansFeatureProperties.other}`}>Other</option>
                </select>
                <label className="dropdown_for_choropleth">View Data</label>
                <select
                    id="race-select"
                    style={{marginLeft: "10px", fontSize:"15px", padding: "1px", marginRight: "10px"}}
                >   
                    <option value="Current">Current</option>
                    <option value="SMD">SMD</option>
                    <option value="MMD">MMD</option>
                    <option value="Precincts">Precincts</option>
                </select>
            </div>
            <div style={{marginBottom: "20px"}}>
                <label className="dropdown_for_choropleth">Color Districts</label>
                <select
                    id="race-select"
                    style={{marginLeft: "10px", fontSize: "15px", padding: "1px", marginRight: "10px"}}
                >
                    <option value="Current">Current</option>
                    <option value="SMD">SMD</option>
                    <option value="MMD">MMD</option>
                </select>
                <label className="toggle">
                    <input
                        type="checkbox"
                        checked={isToggled}
                        onChange={() => setIsToggled(!isToggled)}
                    />
                    <span className="slider"></span>
                </label>
            </div>
            {
                activeLayer === ActiveLayers.Precincts &&
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
                            {districtData && precinctData && (activeLayer === ActiveLayers.Districts ? districtData.features : precinctData.features.filter((feature) => {
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
                                                        activeLayer === ActiveLayers.Districts &&
                                                        (
                                                            <span>
                                                                    <Icon name="roundedSquare" size={1.2} color={districtColors[feature.properties.district].fillColor} borderWidth={"1px"} borderColor={"black"} />
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
                                            <td key={idx} style={{textAlign: "right"}}>
                                                {feature.properties[key] ? feature.properties[key].toString() : ""}
                                            </td>
                                        )
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
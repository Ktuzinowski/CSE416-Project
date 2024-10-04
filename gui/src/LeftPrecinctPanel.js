import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpandAlt, faCompressAlt } from '@fortawesome/free-solid-svg-icons';
import Icon from "./Icon";
import "./App.css";

export const LeftPrecinctPanel = ({ data, onSelectFeature, selectedRace, setSelectedRace, onChangeBorderForHoverOverDistrict, onChangeLeftHoverOverDistrict }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [columnNames, setColumnNames] = useState(null);
    const [pinnedColumns, setPinnedColumns] = useState({}); // Track pinned columns
    const [selectedFeature, setSelectedFeature] = useState(null); // Local state to track the selected feature

    const unwantedColumns = [
        "vistapre", "G20PRELJOR", "G20PREGHAW", "G20PRECBLA", "G20PREIPIE", 
        "G20PREIWES", "G20PREIMCH", "G20PREILAR", "G20PREOWRI", "G20GOVRCOX", 
        "G20GOVDPET", "G20GOVLCOT", "G20GOVADUE", "G20GOVOWRI", "G20ATGRREY", 
        "G20ATGDSKO", "G20ATGLBAU", "G20AUDRDOU", "G20AUDCOST", "G20AUDUFAB", 
        "G20TRERDAM", "G20TRELSPE", "G20TRECPRO", "index"
    ]; // These are useless columns that we will not need to show in LEFT hand panel

    const columnNameMapping = { // Map the names to change the weird names to something more readable
        "PP_TOTAL": "Population",
        "resultspre": "Precinct",
        "G20PRERTRU": "Republican",
        "G20PREDBID": "Democrat",
        "PP_WHTALN": "White",
        "PP_BAAALN": "Black",
        "PP_HISPLAT": "Hispanic",
        "PP_ASNALN": "Asian",
        "PP_HPIALN": "Pacific",
        "PP_NAMALN": "Native",
        "PP_OTHALN": "Other",
    };

    useEffect(() => {
        if (data !== null) {
            const keys = Object.keys(data.features[0].properties); // Removed "index"
            const filteredKeys = keys.filter(key => !unwantedColumns.includes(key)); // Filter out unwanted columns
            setColumnNames(filteredKeys);
            setPinnedColumns(filteredKeys.reduce((acc, key) => ({ ...acc, [key]: false }), {}));
        }
    }, [data]);

    const togglePanel = () => {
        setIsExpanded(!isExpanded);
    };

    // Handle pin icon click
    const togglePin = (column) => {
        setPinnedColumns((prev) => ({
            ...prev,
            [column]: !prev[column] // Toggle pin state
        }))
    }

    // Pass the selected feature back to the parent when clicked
    const handleFeatureSelect = (feature) => {
        setSelectedFeature(feature); // This calls the parent's setSelectedFeature
    };

    // Handle when you are hovering over a district
    const handleHoverOverRowOfData = (feature) => {
        onChangeBorderForHoverOverDistrict(feature.properties.CountyID)
    }

    const handleLeaveHoverOverData = (feature) => {
        onChangeLeftHoverOverDistrict(feature.properties.CountyID)
    }

    // Update parent's selected feature only after rendering completes
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
            const filtered_column_names = columnNames.filter((key) => pinnedColumns[key]);
            if (filtered_column_names.length === 0) {
                return columnNames.slice(0, 4); // Show at least 4 columns if nothing is pinned
            }
            return filtered_column_names;
        }
    }

    return (
        <div className="container_left_data_panel" style={{
            width: isExpanded ? "100%" : "auto", // Auto-width when collapsed
            maxWidth: isExpanded ? "100%" : "fit-content", // Fit the content naturally
            minWidth: "200px", // Set a minimum width for the panel
        }}>
            <div className="left_data_panel_current_selection">
                <h2 className="left_data_panel_title">Precincts</h2>
                <button className="left_data_expand_button" onClick={togglePanel}>
                    <FontAwesomeIcon icon={isExpanded ? faCompressAlt : faExpandAlt} />
                </button>
            </div>

            <div style={{ border: "1px solid #ccc", marginBottom: "20px" }}>
                <label style={{ fontSize: "17px", fontWeight: "Bold", marginLeft: "30px" }} htmlFor="race-select"> Choropleth Map</label>
                <select
                    id="race-select"
                    value={selectedRace}
                    onChange={(e) => setSelectedRace(e.target.value)}
                    style={{ marginLeft: "10px", fontSize: "15px" }}
                >
                    <option value="">Default</option>
                    <option value="PP_WHTALN">White</option>
                    <option value="PP_BAAALN">Black</option>
                    <option value="PP_HISPLAT">Hispanic</option>
                    <option value="PP_ASNALN">Asian</option>
                    <option value="PP_HPIALN">Pacific </option>
                    <option value="PP_NAMALN">Native </option>
                    <option value="PP_OTHALN">Other</option>
                </select>
            </div>

            <hr style={{ width: "100%", border: "1px solid #ccc", marginTop: "-5px" }} />

            {columnNames && (
                <div className="left_precinct_data_table">
                    <table className="left_data_column_names">
                        <thead>
                            <tr>
                                {getVisibleColumns().map((key) => (
                                    <th key={key} className="left_data_column_header">
                                        {columnNameMapping[key] || key}
                                        {isExpanded && (
                                            <span className="pin-icon" onClick={() => togglePin(key)} size={1.1}>
                                                <Icon name={pinnedColumns[key] ? "thumbtack-solid" : "thumbtack"} />
                                            </span>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.features.map((feature, featureIndex) => {
                                return (
                                    <tr key={featureIndex} onMouseEnter={() => handleHoverOverRowOfData(feature)} onMouseLeave={() => handleLeaveHoverOverData(feature)}>
                                        {getVisibleColumns().map((key, idx) => (
                                            <td key={idx} style={{ textAlign: "right" }}>
                                                {feature.properties[key] + ""}
                                            </td>
                                        ))}
                                        
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpandAlt, faCompressAlt } from '@fortawesome/free-solid-svg-icons';
import Icon from "./Icon";
import "./App.css";

export const LeftDataPanel = ({ data, onSelectFeature }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [columnNames, setColumnNames] = useState(null);
    const [pinnedColumns, setPinnedColumns] = useState({}); // Track pinned columns

    useEffect(() => {
        if (data !== null) {
            const keys = ["index", ...Object.keys(data.features[0].properties)];
            setColumnNames(keys);
            setPinnedColumns(keys.reduce((acc, key) => ({ ...acc, [key]: false }), {}));
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
        console.log("CLICKING HERE!")
        onSelectFeature(feature); // This calls the parent's setSelectedFeature
    };

    const getVisibleColumns = () => {
        console.log("Checking visible column names!")
        if (isExpanded) {
            return columnNames;
        }
        else {
            const filtered_column_names = columnNames.filter((key) => key === "index" || pinnedColumns[key]);
            if (filtered_column_names.length === 1) {
                console.log("The length is zero!")
                return [columnNames[0], columnNames[1], columnNames[2], columnNames[3]] // just get two columns at least to display
            }
            return filtered_column_names
        }
    }

    return (
        <div className="container_left_data_panel" style={{
            width: isExpanded ? "100%" : "auto", // Auto-width when collapsed
            maxWidth: isExpanded ? "100%" : "fit-content", // Fit the content naturally
            minWidth: "200px", // Set a minimum width for the panel
        }}>
            <div className="left_data_panel_current_selection">
                <h2 className="left_data_panel_title">Congressional Districts</h2>
                <button className="left_data_expand_button" onClick={togglePanel}>
                    <FontAwesomeIcon icon={isExpanded ? faCompressAlt : faExpandAlt} />
                </button>
            </div>

            <hr style={{ width: "100%", border: "1px solid #ccc", marginTop: "-5px" }} />

            {columnNames && (
                <div className="left_data_table">
                    <table className="left_data_column_names">
                        <thead>
                            <tr>
                                {getVisibleColumns().map((key) => (
                                    <th key={key} className="left_data_column_header">
                                        {key}
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
                            {data.features.map((feature, index) => {
                               return (
                                <tr key={index}>
                                    {getVisibleColumns().map((key, idx) => {
                                        if (!isExpanded && key === "index") {
                                            return (
                                                <td key={idx} style={{textAlign: "left", display: "flex", justifyContent: "space-between"}}>
                                                    <span className="zoom-icon" onClick={() => handleFeatureSelect(feature)}>
                                                            <Icon name="search" size={1.1}/>
                                                   </span>
                                                    <span className="zoom-icon" onClick={() => togglePin("nothing")}>
                                                            <Icon name="paint-brush" size={1.1}/>
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
                                                {feature.properties[key].toString()}
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

        </div>
    );
};

import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpandAlt, faCompressAlt } from '@fortawesome/free-solid-svg-icons';
import Icon from "./Icon";
import "./App.css";

export const LeftDataPanel = ({ data, zoomInOnDistrict }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [columnNames, setColumnNames] = useState(null);
    const [panelWidth, setPanelWidth] = useState(500); // Default panel width in pixels
    const [isResizing, setIsResizing] = useState(false);
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

    const handleMouseDown = () => {
        setIsResizing(true);
    };

    const handleMouseMove = useCallback((e) => {
        if (isResizing) {
            const newWidth = e.clientX; // Use mouse position to adjust width
            setPanelWidth(newWidth);
        }
    }, [isResizing]);

    const handleMouseUp = () => {
        setIsResizing(false);
    };

    useEffect(() => {
        if (isResizing) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        } else {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isResizing, handleMouseMove]);

    return (
        <div className="container_left_data_panel" style={{
            width: isExpanded ? "100%" : `${panelWidth}px`,
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
                                {(() => {
                                    if (isExpanded) {
                                        return columnNames.map((key) => {
                                            if (key === "index") {
                                                return (
                                                    <th key={key} className="left_data_column_header">
                                                        {key}
                                                    </th>
                                                )
                                            }
                                            return (
                                                <th key={key} className="left_data_column_header">
                                                    {key}
                                                    <span className="pin-icon" onClick={() => togglePin(key)}>
                                                        <Icon name={pinnedColumns[key] ? "thumbtack-solid" : "thumbtack"}/>
                                                    </span>
                                                </th>
                                            )
                                        })
                                    }
                                    const pinnedColumnNames = []
                                    const unpinnedColumnNames = []
                                    columnNames.forEach((key) => {
                                        if (key === "index") {
                                            pinnedColumnNames.push(key)
                                        }
                                        else {
                                            if (pinnedColumns[key]) {
                                                pinnedColumnNames.push(key)
                                            }
                                            else {
                                                unpinnedColumnNames.push(key)
                                            }
                                        }
                                    })
                                    const sortedColumns = [...pinnedColumnNames, ...unpinnedColumnNames]
                                    return sortedColumns.map((key) => {
                                        if (key === "index") {
                                            return (
                                                <th key={key} className="left_data_column_header">
                                                    {key}
                                                </th>
                                            )
                                        }
                                        return (
                                            <th key={key} className="left_data_column_header">
                                                {key}
                                                <span className="pin-icon" onClick={() => togglePin(key)}>
                                                    <Icon name={pinnedColumns[key] ? "thumbtack-solid" : "thumbtack"}/>
                                                </span>
                                            </th>
                                        )
                                    }
                                )
                                })()
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {data.features.map((feature, index) => {
                                if (isExpanded) {
                                    return (
                                        <tr key={index} >
                                            <td style={{textAlign: 'left'}}>{index}</td>
                                            {Object.values(feature.properties).map((value, idx) => (
                                                <td key={idx}>{value.toString()}</td>
                                            ))}
                                        </tr>
                                    )
                                }
                                const rowData = [] // start with index
                                const pinnedValues = []
                                const nonPinnedValues = []

                                Object.entries(feature.properties).forEach(([key, value]) => {
                                    if (key === "index") {
                                        return
                                    }
                                    if (pinnedColumns[key]) {
                                        pinnedValues.push(value)
                                    }
                                    else {
                                        nonPinnedValues.push(value)
                                    }
                                })

                                // Combine pinned and non-pinned values
                                const orderedValues = [...pinnedValues, ...nonPinnedValues]
                                console.log(orderedValues)

                                // Add the ordered values to the row data
                                rowData.push(...orderedValues)

                                console.log(pinnedValues)
                                console.log(nonPinnedValues)

                                console.log(rowData)

                                return (
                                    <tr key={index}>
                                        <td style={{textAlign: "left", display: "flex", justifyContent: "space-between"}}>
                                            <span className="zoom-icon" onClick={() => togglePin("nothing")}>
                                                            <Icon name="search" />
                                            </span>
                                            <span className="zoom-icon" onClick={() => togglePin("nothing")}>
                                                            <Icon name="paint-brush" />
                                            </span>
                                        </td>
                                        {rowData.map((value, idx) => (
                                            <td key={idx}>{value.toString()}</td>
                                        ))}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Resizable Handle */}
            <div className="resize-handle" onMouseDown={handleMouseDown} />
        </div>
    );
};

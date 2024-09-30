import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpandAlt, faCompressAlt } from '@fortawesome/free-solid-svg-icons'; // Import icons
import "./App.css"

export const LeftDataPanel = ({ data }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [columnNames, setColumnNames] = useState(null);

    // useEffect to log data when it's available
    useEffect(() => {
        if (data !== null) {
            console.log("Data received:", data);
            console.log(data.features[0].properties)
            setColumnNames(data.features[0].properties)
        }
    }, [data])

    const togglePanel = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="container_left_data_panel" style={{
            width: isExpanded ? "100%" : "30%",
        }}>
            <div className="left_data_panel_current_selection">
                <h2 className="left_data_panel_title">Congressional Districts</h2>
                <button className="left_data_expand_button" onClick={togglePanel}>
                    <FontAwesomeIcon icon={isExpanded ? faCompressAlt : faExpandAlt} />
                </button>
            </div>

            <hr style={{ width: "100%", border: "1px solid #ccc", marginTop: "-5px" }} />

            {isExpanded && columnNames && (
                <div className="left_data_table">
                    <table className="left_data_column_names">
                        <thead>
                            <tr>
                                {
                                    Object.entries(columnNames).map(([key, value]) => (
                                        <th key={key}>
                                            {key}
                                        </th>
                                    ))
                                }
                                <th>
                                    Property Name
                                </th>
                                <th>
                                    Value
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(columnNames).map(([key, value]) => (
                                <tr key={key}>
                                    <td>{key}</td>
                                    <td>{value.toString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
import React, { useState } from "react";
import "./MapFilter.css";
import "../App.css"

export const MapFilter = ({ displayCurrent, displaySMD, displayMMD, displayPrecincts }) => {
    const [selected, setSelected] = useState(null);

    const handleSelect = (option) => {
        setSelected(option);
        // Call the respective function based on the selected option if needed
    };

    return (
        <div className="map_filter">
            <button
                className={`map_filter_option ${selected === "Current" ? "selected" : ""}`}
                onClick={() => handleSelect("Current")}
            >
                Current
            </button>
            <button
                className={`map_filter_option ${selected === "SMD" ? "selected" : ""}`}
                onClick={() => handleSelect("SMD")}
            >
                SMD
            </button>
            <button
                className={`map_filter_option ${selected === "MMD" ? "selected" : ""}`}
                onClick={() => handleSelect("MMD")}
            >
                MMD
            </button>
            <button
                className={`map_filter_option ${selected === "Precincts" ? "selected" : ""}`}
                onClick={() => handleSelect("Precincts")}
            >
                Precincts
            </button>
        </div>
    );
};

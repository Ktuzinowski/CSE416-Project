import React, { useState, useEffect } from "react";
import { SMDBarChartGraph } from "./SMDBarChartGraph";
import { MMDBarChartGraph } from "./MMDBarChartGraph";
import BWGraph from "./BoxWhiskerPlot.js"; // Import the BW graph component
import utahAggDistrictData from "./utah_data/aggregatedUtahDistricts.geojson";
import VoterSeats from "./VoterSeats"; // Import the new VoterSeats component
import SMDVoter from "./SMDVoter.js";
import MMDVoter from "./MMDVoter.js";

export const MMD_vs_SMD_Comparison = ({ data }) => {
  const [selectedGraph, setSelectedGraph] = useState("SMD"); // Default to 'SMD'
  const [dataForSMD, setDataForSMD] = useState(null);
  const [geojsonData, setGeojsonData] = useState(null); // State to hold GeoJSON data

  useEffect(() => {
    // Fetch the GeoJSON data
    fetch(utahAggDistrictData)
      .then((response) => response.json())
      .then((data) => setGeojsonData(data))
      .catch((error) => console.error("Error fetching GeoJSON:", error));
  }, []);

  const renderGraph = () => {
    switch (selectedGraph) {
      case "SMD":
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <SMDBarChartGraph data={dataForSMD} />
            <SMDVoter />
          </div>
        );
      case "MMD":
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <MMDBarChartGraph />
            <MMDVoter />
          </div>
        );
      case "Compare":
        return (
          <div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div>
                <SMDBarChartGraph data={dataForSMD} />
              </div>
              <div>
                <MMDBarChartGraph data={dataForSMD} />
              </div>
            </div>
            <div>
              <VoterSeats />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderBWP = () => {
    return geojsonData ? (
      <BWGraph geojsonData={geojsonData} state={"utah"}/>
    ) : (
      <p>Loading BWP...</p>
    );
  };

  return (
    <div style={{ marginBottom: "50px" }}>
      <div>
        <button
          className={
            selectedGraph === "SMD"
              ? "mmd_smd_selection_button_selected"
              : "mmd_smd_selection_button"
          }
          style={{ marginLeft: "10px" }}
          onClick={() => setSelectedGraph("SMD")}
        >
          SMD
        </button>
        <button
          className={
            selectedGraph === "MMD"
              ? "mmd_smd_selection_button_selected"
              : "mmd_smd_selection_button"
          }
          style={{ borderRight: "0px", borderLeft: "0px" }}
          onClick={() => setSelectedGraph("MMD")}
        >
          MMD
        </button>
        <button
          className={
            selectedGraph === "Compare"
              ? "mmd_smd_selection_button_selected"
              : "mmd_smd_selection_button"
          }
          onClick={() => setSelectedGraph("Compare")}
        >
          Compare
        </button>
      </div>
      <div>{renderGraph()}</div>
      {selectedGraph === "SMD" && ( // Only render the BWGraph if SMD is selected
        <div style={{ display: "flex", justifyContent: "center" }}>
          {renderBWP()}
        </div>
      )}
    </div>
  );
};

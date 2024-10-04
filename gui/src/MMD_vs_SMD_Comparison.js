import React, { useEffect, useState } from "react";
import SMDGraph from "./SMDGraph.js"; // Import the SMD graph component
import MMDGraph from "./MMDGraph"; // Import the MMD graph component
import BWGraph from "./BoxWhiskerPlot.js"; // Import the BW graph component
import utahAggDistrictData from "./utah_data/aggregatedUtahDistricts.geojson";

export const MMD_vs_SMD_Comparison = () => {
  const [selectedGraph, setSelectedGraph] = useState("SMD"); // Default to 'SMD'
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
        return <SMDGraph />;
      case "MMD":
        return <MMDGraph />;
      case "Compare":
        return (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div>
              <h2>SMD Graph</h2>
              <SMDGraph />
            </div>
            <div>
              <h2>MMD Graph</h2>
              <MMDGraph />
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  const renderBWP = () => {
    return geojsonData ? (
      <BWGraph geojsonData={geojsonData} />
    ) : (
      <p>Loading BWP...</p>
    );
  };
  return (
    <div>
      <div>
        <button onClick={() => setSelectedGraph("SMD")}>SMD</button>
        <button onClick={() => setSelectedGraph("MMD")}>MMD</button>
        <button onClick={() => setSelectedGraph("Compare")}>Compare</button>
      </div>
      <div>{renderGraph()}</div>
      <div>{renderBWP()}</div>
    </div>
  );
};

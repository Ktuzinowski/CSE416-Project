import React, { useState } from "react";
import Plot from "react-plotly.js"
import { BoxAndWhiskerPlotBasisOfComparison } from "../../../utils/Constants";
import { jsonDataForBoxAndWhisker } from "../../../utils/Constants";

export const BoxAndWhiskerPlotSMD = ({ state }) => {
    const [valueForDropdownBOC, setValueForDropdownBOC] = useState(BoxAndWhiskerPlotBasisOfComparison.Democrat);
    
    // Extract district data
    const districts = jsonDataForBoxAndWhisker.districts;
    const currentDistricts = jsonDataForBoxAndWhisker.currentDistricts;

    // Prepare data for the box-and-whisker plot
    const boxData = districts.map((district) => ({
        type: "box",
        name: `District ${district.district}`,
        x: [`District ${district.district}`], // Assign the district name as the x-axis value
        q1: [district.q1],
        median: [district.median],
        q3: [district.q3],
        lowerfence: [district.min],
        upperfence: [district.max],
        boxpoints: false, // Hide individual points
        showlegend: true // Exclude the box trace from the legend
    }));

    // Prepare data for the enacted district plans
    const enactedData = {
        type: "scatter",
        mode: "markers",
        name: "Enacted Plan",
        x: currentDistricts.map((district) => `District ${district.district}`),
        y: currentDistricts.map((district) => district.value),
        marker: { color: "red", size: 8, symbol: "circle" },
    };

    // Combine data
    const plotData = [...boxData, enactedData]

    return (
        <div>
            <div className="left_data_panel_current_selection">
                <h2 className="left_data_panel_title">SMD Ensemble Utah</h2>
            </div>
            <label className="dropdown_for_choropleth">Basis of Comparison</label>
            <select
                value={valueForDropdownBOC}
                onChange={(e) => setValueForDropdownBOC(e.target.value)}
                style={{marginLeft: "10px", marginTop: "-20px", fontSize: "15px", padding: "1px", marginRight: "10px"}}
            >
                {Object.keys(BoxAndWhiskerPlotBasisOfComparison).map((boc) => {
                    return (
                        <option key={boc} value={BoxAndWhiskerPlotBasisOfComparison[boc]}>
                            {boc}
                        </option>
                    )
                })}
            </select>
            <Plot
            data={plotData}
            layout={{
                yaxis: { title: "Democrat Percentage" },
                showlegend: true,
                legend: {
                    orientation: "h",
                    showlegend: true,
                    bordercolor: "#ccc", // Set the border color to black
                    borderwidth: 2, // Set the border width
                    bgcolor: "white" // Optional: Set the background color for the legend
                }
            }}
            style={{ width: "100%", height: "100%"}}
            />
        </div>
    )
}
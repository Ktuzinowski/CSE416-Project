import React, { useState } from "react";
import Plot from "react-plotly.js"
import { BoxAndWhiskerPlotBasisOfComparison } from "../../../utils/Constants";

export const BoxAndWhiskerPlotMMD = ({ state }) => {
    const [valueForDropdownBOC, setValueForDropdownBOC] = useState(BoxAndWhiskerPlotBasisOfComparison.Democrat);
    const jsonDataForBoxAndWhiskerMMD = {}
    // Extract district data
    const districts = jsonDataForBoxAndWhiskerMMD.districts;

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

    // Combine data
    const plotData = [...boxData]

    // Annotations for number of representatives
    const annotations = districts.map((district) => ({
        x: `District ${district.district}`,
        y: -0.11, // Position below the x-axis
        xref: "x",
        yref: "paper",
        text: `${district.representatives} reps`,
        showarrow: false,
        font: { size: 12, color: "black" },
    }));

    return (
        <>
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
                annotations: annotations, // Add the annotations to the layout
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
        </>
    )
}
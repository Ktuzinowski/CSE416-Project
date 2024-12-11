import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { BoxAndWhiskerPlotBOC } from "../../../utils/Constants";
import { getSmdBoxAndWhiskerPlotData } from "../../../axiosClient";

export const BoxAndWhiskerSMD = ({ state }) => {
    const [valueForDropdownBOC, setValueForDropdownBOC] = useState(BoxAndWhiskerPlotBOC.Democrat);
    const [plotData, setPlotData] = useState(null);

    useEffect(() => {
        const loadData = async (state, boc) => {
            const data = await getSmdBoxAndWhiskerPlotData(state, boc);
            const bins = data.bins;
            const currentDistricts = data.current_districts;

            // Prepare data for the box-and-whisker plot
            const boxData = bins.map((bin) => ({
                type: "box",
                name: `${bin.bin}`,
                x: [`${bin.bin}`], // Assign the district name as the x-axis value
                q1: [bin.q1],
                median: [bin.median],
                q3: [bin.q3],
                lowerfence: [bin.min],
                upperfence: [bin.max],
                boxpoints: false, // Hide individual points
                showlegend: false, // Exclude the box trace from the legend
                fillcolor: "white", // Fill color for the box
                line: {
                    color: "black", // Border color for the box
                    width: 1.5 // Width of the border
                }
            }));

            // Prepare data for the enacted district plans
            const enactedData = {
                type: "scatter",
                mode: "markers",
                name: "Enacted District Plan",
                x: [], // Placeholder for bin names
                y: [], // Placeholder for district values
                marker: { color: "red", size: 8, symbol: "circle" },
            };

            bins.forEach((bin) => {
                const point = currentDistricts.find((district) => district.district === bin.bin);

                enactedData.x.push(`${bin.bin}`);
                enactedData.y.push(point.value);
                
            });

            // Combine data
            const plotData = [...boxData, enactedData]

            setPlotData(plotData);
        }

        loadData(state, valueForDropdownBOC);
    }, [state, valueForDropdownBOC])

    return (
        <>
            <label className="dropdown_styling">Basis of Comparison</label>
            <select
                value={valueForDropdownBOC}
                onChange={(e) => setValueForDropdownBOC(e.target.value)}
                className="dropdown_select_styling"
            >
                {Object.keys(BoxAndWhiskerPlotBOC).map((boc) => {
                    return (
                        <option key={boc} value={BoxAndWhiskerPlotBOC[boc]}>
                            {boc}
                        </option>
                    )
                })}
            </select>
            <Plot
                data={plotData}
                layout={{
                    yaxis: { title: `${valueForDropdownBOC.charAt(0).toUpperCase() + valueForDropdownBOC.slice(1)} Percentage` },
                    xaxis: { title: "Bins" },
                    showlegend: true,
                    legend: {
                        orientation: "h",
                        showlegend: true,
                        bordercolor: "#ccc", // Set the border color to black
                        borderwidth: 2, // Set the border width
                        bgcolor: "white", // Optional: Set the background color for the legend
                        y: -0.23, // Move the legend down; increase the value for more margin at the top
                    },
                    margin: {
                        l: 70, // Left margin
                        r: 50, // Right margin
                        t: 10, // Top margin (reduce to remove extra space)
                        b: 50 // Bottom margin
                    }
                }}
                style={{ width: "600px", height: "500px"}}
            />
        </>
    )
}
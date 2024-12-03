import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js"
import { BoxAndWhiskerPlotBasisOfComparison } from "../../../utils/Constants";
import { getMmdBoxAndWhiskerPlotData } from "../../../axiosClient";

export const BoxAndWhiskerPlotMMD = ({ state }) => {
    const [valueForDropdownBOC, setValueForDropdownBOC] = useState(BoxAndWhiskerPlotBasisOfComparison.Democrat);
    const [plotData, setPlotData] = useState(null);

    useEffect(() => {
        const loadBoxAndWhiskerMMDPlotData = async (state, boc) => {
            const data = await getMmdBoxAndWhiskerPlotData(state, boc);
            console.log(data);
            const processedData = processPlotData(data);
            console.log(processedData);
            setPlotData(processedData);
        }

        loadBoxAndWhiskerMMDPlotData(state, valueForDropdownBOC);
    }, [state, valueForDropdownBOC])

    const processPlotData = (data) => {
        const traces = [];
        const annotations = [];
        const shapes = [];
        const bins = data.bins;
    
        let maxY = -Infinity; // Track the maximum Y value for annotation positioning.
        let minY = Infinity; // Track the minimum Y value for annotation positioning.
    
        bins.forEach((binData) => {
            Object.entries(binData).forEach(([key, districts]) => {
                districts.forEach((district) => {
                    traces.push({
                        type: "box",
                        name: `Bin ${district.bin}`,
                        x: [district.bin],
                        q1: [district.q1],
                        median: [district.median],
                        q3: [district.q3],
                        lowerfence: [district.min],
                        upperfence: [district.max],
                        boxpoints: false,
                        showlegend: false,
                        fillcolor: "white",
                        line: {
                            color: "black",
                            width: 1.5
                        }
                    });
    
                    maxY = Math.max(maxY, district.max);
                    minY = Math.min(minY, district.min);
                });
            });
        });

        bins.forEach((binData) => {
            Object.entries(binData).forEach(([key, districts]) => {
                districts.forEach((district) => {
                    annotations.push({
                        x: district.bin,
                        y: maxY + 0.025, // Position slightly above the highest value.
                        text: `${key} Reps`,
                        font: {
                            size: 12,
                            color: "black"
                        },
                        showarrow: false,
                        xref: "x",
                        yref: "y"
                    });
            
                    // Add a vertical dashed line after each bin.
                    shapes.push({
                        type: "line",
                        x0: district.bin + 0.5, // Start of the line (between bins).
                        x1: district.bin + 0.5, // End of the line (same x-coordinate).
                        y0: minY, // Start at the bottom of the Y-axis.
                        y1: maxY + 0.01, // Extend slightly above the max value.
                        line: {
                            color: "gray",
                            width: 1,
                            dash: "dash"
                        }
                    });
                })
            });
        });
    
        return { traces, annotations, shapes };
    };

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
            data={plotData?.traces || []}
            layout={{
                yaxis: { title: `${valueForDropdownBOC.charAt(0).toUpperCase() + valueForDropdownBOC.slice(1)} Percentage` },
                xaxis: { title: "Bins" },
                showlegend: true,
                legend: {
                    orientation: "h",
                    bordercolor: "#ccc",
                    borderwidth: 2,
                    bgcolor: "white",
                    y: -0.23,
                },
                annotations: plotData?.annotations || [],
                shapes: plotData?.shapes || [], // Add shapes for dashed lines.
                margin: {
                    l: 70,
                    r: 50,
                    t: 10,
                    b: 50,
                }
            }}
            style={{ width: "600px", height: "500px" }}
        />
        </>
    )
}
import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { BoxAndWhiskerPlotBOC } from "../../../utils/Constants";
import { getSmdBoxAndWhiskerPlotData, getMmdBoxAndWhiskerPlotData } from "../../../axiosClient";
import { processPlotDataMMD, processPlotDataSMD } from "./ProcessDataBoxAndWhisker";
import { BoxAndWhiskerChartOptions } from "../../../utils/Constants";

export const BoxAndWhiskerSMD = ({ state }) => {
    const [valueForDropdownSmdBOC, setValueForDropdownSmdBOC] = useState(BoxAndWhiskerPlotBOC.Democrat);
    const [valueForDropdownMmdBOC, setValueForDropdownMmdBOC] = useState(BoxAndWhiskerPlotBOC.Democrat);
    const [currentChart, setCurrentChart] = useState(BoxAndWhiskerChartOptions.SMD);
    const [plotDataSMD, setPlotDataSMD] = useState(null);
    const [plotDataMMD, setPlotDataMMD] = useState(null);

    useEffect(() => {
        const loadBoxAndWhiskerSMDPlotData = async (state, boc) => {
            const data = await getSmdBoxAndWhiskerPlotData(state, boc);
            const processedSmdData = processPlotDataSMD(data);
            setPlotDataSMD(processedSmdData);
        }

        loadBoxAndWhiskerSMDPlotData(state, valueForDropdownSmdBOC);

        const loadBoxAndWhiskerMMDPlotData = async (state, boc) => {
            const data = await getMmdBoxAndWhiskerPlotData(state, boc);
            const processedData = processPlotDataMMD(data);
            setPlotDataMMD(processedData);
        }

        loadBoxAndWhiskerMMDPlotData(state, valueForDropdownMmdBOC);
    }, [state, valueForDropdownMmdBOC, valueForDropdownSmdBOC])

    return (
        <>
        <div style={{marginTop: "-15px" }}>
            <div style={{marginBottom: "5px"}}>
                <label className="dropdown_styling" style={{fontSize: "1.2rem"}}>Chart</label>
                <select
                    value={currentChart}
                    onChange={(e) => setCurrentChart(e.target.value)}
                    className="dropdown_select_styling"
                >
                    {Object.keys(BoxAndWhiskerChartOptions).map((chart) => {
                        return (
                            <option key={chart} value={BoxAndWhiskerChartOptions[chart]}>
                                {BoxAndWhiskerChartOptions[chart]}
                            </option>
                        )
                    })}
                </select>
            </div>
            {
                (currentChart === BoxAndWhiskerChartOptions.SMD && (
                <div>
                    <label className="dropdown_styling">Basis of Comparison</label>
                    <select
                        value={valueForDropdownSmdBOC}
                        onChange={(e) => setValueForDropdownSmdBOC(e.target.value)}
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
                        data={plotDataSMD}
                        layout={{
                            yaxis: { title: `${valueForDropdownSmdBOC.charAt(0).toUpperCase() + valueForDropdownSmdBOC.slice(1)} Percentage` },
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
                </div>
                ))
            }
            {
                (currentChart === BoxAndWhiskerChartOptions.MMD && (
                    <div>
                        <label className="dropdown_styling">Basis of Comparison</label>
                            <select
                                value={valueForDropdownMmdBOC}
                                onChange={(e) => setValueForDropdownMmdBOC(e.target.value)}
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
                            data={plotDataMMD?.traces || []}
                            layout={{
                                yaxis: { title: `${valueForDropdownMmdBOC.charAt(0).toUpperCase() + valueForDropdownMmdBOC.slice(1)} Percentage` },
                                xaxis: { title: "Bins" },
                                showlegend: true,
                                legend: {
                                    orientation: "h",
                                    bordercolor: "#ccc",
                                    borderwidth: 2,
                                    bgcolor: "white",
                                    y: -0.23,
                                },
                                annotations: plotDataMMD?.annotations || [],
                                shapes: plotDataMMD?.shapes || [], // Add shapes for dashed lines.
                                margin: {
                                    l: 70,
                                    r: 50,
                                    t: 10
                                }
                            }}
                            style={{ width: "600px", height: "500px" }}
                        />
                </div>
                ))
            }
        </div>
        </>
    )
}
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
            setPlotData(data);
        }

        loadBoxAndWhiskerMMDPlotData(state, valueForDropdownBOC);
    }, [state, valueForDropdownBOC])

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
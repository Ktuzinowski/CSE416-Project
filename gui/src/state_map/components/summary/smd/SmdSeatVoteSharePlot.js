import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js"; // Install with npm install react-plotly.js plotly.js
import { getSmdDistrictPlanSeatVoteCurve } from "../../../../axiosClient";

export const SmdSeatVoteSharePlot = ({ name }) => {
    const [voteSeatShareData, setVoteSeatShareData] = useState(null);

    useEffect(() => {
        const loadData = async (name) => {
            const data = await getSmdDistrictPlanSeatVoteCurve(name);
            console.log(data);
            setVoteSeatShareData(data);
        };
        if (name) {
            loadData(name);
        }
    }, [name]);

    if (!voteSeatShareData) {
        return <h1>Loading...</h1>;
    }

    const {
        vote_share,
        republican_seat_share,
        democratic_seat_share,
    } = voteSeatShareData;

    return (
        <div style={{overflow: "hidden"}}>
            <div className="summaryData" style={{display: "flex", flexDirection: "row", gap: "10px", marginTop: "-10px"}}>
            <p><b>Partison Bias</b>: {voteSeatShareData.partisan_bias.toFixed(2)}</p>
            <p><b>Symmetry</b>: {voteSeatShareData.symmetry.toFixed(2)}</p>
            <p><b>Responsiveness</b>: {voteSeatShareData.responsiveness.toFixed(2)}</p>
        </div>
            <Plot
                data={[
                    {
                        x: vote_share, // X-axis: vote share
                        y: republican_seat_share, // Y-axis: Republican seat share
                        type: "scatter", // Line plot
                        mode: "lines",
                        line: { color: "red" }, // Red line
                        name: "Republican",
                    },
                    {
                        x: vote_share, // X-axis: vote share
                        y: democratic_seat_share, // Y-axis: Democratic seat share
                        type: "scatter", // Line plot
                        mode: "lines",
                        line: { color: "blue" }, // Blue line
                        name: "Democratic",
                    },
                    // SMD Republican Points
                    {
                        x: [voteSeatShareData.vote_share_republican, voteSeatShareData.vote_share_republican],
                        y: [
                            voteSeatShareData.seat_share_republican_smd
                        ],
                        type: "scatter",
                        mode: "markers",
                        marker: { color: "red", size: 10 },
                        name: "SMD Republican Seat Share",
                    },
                    // SMD Democratic Points
                    {
                        x: [voteSeatShareData.vote_share_democratic],
                        y: [
                            voteSeatShareData.seat_share_democratic_smd
                        ],
                        type: "scatter",
                        mode: "markers",
                        marker: { color: "blue", size: 10 },
                        name: "SMD Democratic Seat Share",
                    },
                    // MMD Republican Points
                    {
                        x: [voteSeatShareData.vote_share_republican],
                        y: [
                            voteSeatShareData.seat_share_republican_mmd
                        ],
                        type: "scatter",
                        mode: "markers",
                        marker: { color: "orange", size: 10 },
                        name: "SMD Republican Seat Share",
                    },
                    // MMD Democratic Points
                    {
                        x: [voteSeatShareData.vote_share_democratic],
                        y: [
                            voteSeatShareData.seat_share_democratic_mmd
                        ],
                        type: "scatter",
                        mode: "markers",
                        marker: { color: "purple", size: 10 },
                        name: "SMD Republican Seat Share",
                    },
                ]}
                layout={{
                    title: "Seat-Vote Curve",
                    xaxis: { title: "Vote Share (%)" },
                    yaxis: { title: "Seat Share (%)" },
                    legend: { orientation: "h",             y: -0.2, // Moves legend below the x-axis
                    }, // Horizontal legend
                    margin: {
                        l: 70, // Left margin
                        r: 50, // Right margin
                        t: 30, // Top margin (reduce to remove extra space)
                        b: 0 // Bottom margin
                    }
                }}
                style={{ width: "100%", height: "500px" }} // Responsive sizing
            />
        </div>
    );
};

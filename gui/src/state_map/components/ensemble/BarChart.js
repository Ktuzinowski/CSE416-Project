import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { BarChartOptions } from "../../../utils/Constants";
import { getSmdEnsembleSummaryData, getMmdEnsembleSummaryData } from "../../../axiosClient";

export const BarChart = ({ state }) => {
  const [smdSummaryData, setSmdSummaryData] = useState(null);
  const [mmdSummaryData, setMmdSummaryData] = useState(null);
  const [valueForDropdown, setValueForDropdown] = useState(BarChartOptions.RangeOfOpportunityDistricts);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const smdData = await getSmdEnsembleSummaryData(state);
        const mmdData = await getMmdEnsembleSummaryData(state);
        setSmdSummaryData(smdData);
        setMmdSummaryData(mmdData);
      } catch (error) {
        console.error("Error fetching summary data:", error);
      }
    };
    fetchData();
  }, [state]);

  const prepareChartData = (dataObject) => {
    return {
      labels: Object.keys(dataObject),
      values: Object.values(dataObject),
    };
  };

  const renderSingleBarChart = (dataObject, title, xAxisLabel, yAxisLabel, color, isRangeOfOpportunity, isRepublicanDemocraticSplit) => {
    const chartData = prepareChartData(dataObject);

    return (
      <Plot
        data={[
          {
            x: chartData.labels,
            y: chartData.values,
            type: "bar",
            marker: { color },
          },
        ]}
        layout={{
          title: { text: title, font: { size: 14 } },
          xaxis: {
            title: { text: xAxisLabel, font: { size: 12 } },
            tickangle: -45,
            automargin: true,
            tickmode: isRangeOfOpportunity ? "linear" : undefined,
            dtick: isRangeOfOpportunity ? 1 : undefined,
          },
          yaxis: {
            title: { text: yAxisLabel, font: { size: 12 } },
            automargin: true,
            tickmode: isRangeOfOpportunity || isRepublicanDemocraticSplit ? "linear" : undefined,
            dtick: isRepublicanDemocraticSplit ? 1000 : isRangeOfOpportunity ? 1000 : undefined, // Increment y-axis
            range: isRepublicanDemocraticSplit ? [0, 5000] : undefined, // Cap max y-axis at 5000
          },
          margin: { t: 40, l: 50, r: 20, b: 60 },
          responsive: true,
        }}
        style={{ width: "300px", height: "250px" }}
      />
    );
  };

  if (!smdSummaryData || !mmdSummaryData) {
    return <p>Loading data...</p>;
  }

  return (
    <>
      <label className="dropdown_styling">Chart</label>
      <select
        value={valueForDropdown}
        onChange={(e) => setValueForDropdown(e.target.value)}
        className="dropdown_select_styling"
      >
        {Object.keys(BarChartOptions).map((option) => (
          <option key={option} value={BarChartOptions[option]}>
            {BarChartOptions[option]}
          </option>
        ))}
      </select>
      <div>
        {valueForDropdown === BarChartOptions.RangeOfOpportunityDistricts && (
          <>
            <h1 className="barChartHeader">Range of Opportunity Representatives</h1>
            <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
              {renderSingleBarChart(
                smdSummaryData.range_of_opportunity_representatives,
                "SMD",
                "Opportunity Representatives",
                "Frequency",
                "steelblue",
                true, // Range of Opportunity scaling
                false
              )}
              {renderSingleBarChart(
                mmdSummaryData.range_of_opportunity_representatives,
                "MMD",
                "Opportunity Representatives",
                "Frequency",
                "orange",
                true, // Range of Opportunity scaling
                false
              )}
            </div>
          </>
        )}
        {valueForDropdown === BarChartOptions.RepublicanDemocraticSplit && (
          <>
            <h1 className="barChartHeader">Frequency of Republican-Democratic Splits</h1>
            <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
              {renderSingleBarChart(
                smdSummaryData.republican_democratic_split_frequency,
                "SMD",
                "Republican-Democratic Split",
                "Frequency",
                "steelblue",
                false,
                true // Republican-Democratic y-axis scaling
              )}
              {renderSingleBarChart(
                mmdSummaryData.republican_democratic_split_frequency,
                "MMD",
                "Republican-Democratic Split",
                "Frequency",
                "orange",
                false,
                true // Republican-Democratic y-axis scaling
              )}
            </div>
          </>
        )}
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Category</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>SMD</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>MMD</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ border: "1px solid black", padding: "8px" }}>Republican Seat Share</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{smdSummaryData.average_republican_representatives.toFixed(2)} ({(smdSummaryData.republican_seat_share * 100).toFixed(2)}%)</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{mmdSummaryData.average_republican_representatives.toFixed(2)} ({(mmdSummaryData.republican_seat_share * 100).toFixed(2)}%)</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid black", padding: "8px" }}>Democratic Seat Share</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{smdSummaryData.average_democratic_representatives.toFixed(2)} ({(smdSummaryData.democratic_seat_share * 100).toFixed(2)}%)</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{mmdSummaryData.average_democratic_representatives.toFixed(2)} ({(mmdSummaryData.democratic_seat_share * 100).toFixed(2)}%)</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid black", padding: "8px" }}>Republican Vote Share</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{smdSummaryData.republican_vote_share.toFixed(2)}%</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{mmdSummaryData.republican_vote_share.toFixed(2)}%</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid black", padding: "8px" }}>Democratic Vote Share</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{smdSummaryData.democratic_vote_share.toFixed(2)}%</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{mmdSummaryData.democratic_vote_share.toFixed(2)}%</td>
                    </tr>
                </tbody>
            </table>
    </>
  );
};

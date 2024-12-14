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

      <div className="supp">
        <p>SMD Republican Seat Share: {(smdSummaryData.republican_seat_share * 100).toFixed(2)}%</p>
        <p>SMD Democratic Seat Share: {(smdSummaryData.democratic_seat_share * 100).toFixed(2)}%</p>
        <p>MMD Republican Seat Share: {(mmdSummaryData.republican_seat_share * 100).toFixed(2)}%</p>
        <p>MMD Democratic Seat Share: {(mmdSummaryData.democratic_seat_share * 100).toFixed(2)}%</p>
        <p>Republican Vote Share: {(smdSummaryData.republican_vote_share * 100).toFixed(2)}%</p>
        <p>Democratic Vote Share: {(smdSummaryData.democratic_vote_share * 100).toFixed(2)}%</p>
      </div>
    </>
  );
};

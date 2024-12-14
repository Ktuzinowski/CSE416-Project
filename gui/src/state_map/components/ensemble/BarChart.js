import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import {BarChartOptions} from "../../../utils/Constants";
import { getSmdEnsembleSummaryData, getMmdEnsembleSummaryData } from "../../../axiosClient";

export const BarChart = ({ state }) => {
  const [summaryData, setSummaryData] = useState(null);
  const [summaryDataMMD, setSummaryDataMMD] = useState(null);
  const [valueForDropdown, setValueForDropdown] = useState(BarChartOptions.RangeOfOpportunityDistricts);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const smdData = await getSmdEnsembleSummaryData(state);
        setSummaryData(smdData);

        const mmdData = await getMmdEnsembleSummaryData(state);
        setSummaryDataMMD(mmdData);
      } catch (error) {
        console.error("Error fetching summary data:", error);
      }
    };
    fetchData();
  }, [state]);

  const prepareChartData = (dataJSON) => {
    return {
      labels: Object.keys(dataJSON),
      values: Object.values(dataJSON),
    };
  };

  const renderBarChart = (dataJSON, title, xAxisLabel, yAxisLabel) => {
    const chartData = prepareChartData(dataJSON);

    return (
      <Plot
      data={[
        {
          x: chartData.labels,
          y: chartData.values,
          type: "bar",
          marker: { color: "steelblue" },
        },
      ]}
      layout={{
        title: { text: title, font: { size: 14 } },
        xaxis: { 
          title: { text: xAxisLabel, font: { size: 12 } }, 
          tickangle: -45, 
          automargin: true,
          range: [0, 4], // Set X-axis range here
        },
        yaxis: {
          title: { text: yAxisLabel, font: { size: 12 } },
          tickvals: [1000, 2000, 3000, 4000, 5000], // Custom tick values
          range: [0, 5000], // Sets the Y-axis range
        },
        margin: { t: 40, l: 50, r: 20, b: 60 },
        responsive: true,
      }}
      style={{ width: "300px", height: "250px" }}
    />
  );
};

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
            <div style={{ display: "flex", gap: "20px" }}>
              {renderBarChart(OpportunityRepresentativeJSON, "SMD Opportunity Representatives", "Opportunity Representatives", "Frequency")}
              {renderBarChart(RangeOfSplitsMMDJSON, "MMD Opportunity Representatives", "Opportunity Representatives", "Frequency")}
            </div>
          </>
        )}
        {valueForDropdown === BarChartOptions.RepublicanDemocraticSplit && (
          <>
            <h1 className="barChartHeader">Frequency of Republican-Democratic Splits</h1>
            <div style={{ display: "flex", gap: "20px" }}>
              {renderBarChart(RangeOfSplitsJSON, "SMD Republican-Democratic Split", "Republican-Democratic Split", "Frequency")}
              {renderBarChart(RangeOfSplitsMMDJSON, "MMD Republican-Democratic Split", "Republican-Democratic Split", "Frequency")}
            </div>
          </>
        )}
        <div>
          <p className="supp">
            SMD Republican Seat Share: {supplementSMD.republican_seat_share}
            <br />
            SMD Democratic Seat Share: {supplementSMD.democratic_seat_share}
            <br />
            MMD Republican Seat Share: {supplementMMD.republican_seat_share}
            <br />
            MMD Democratic Seat Share: {supplementMMD.democratic_seat_share}
            <br />
            Republican Vote Share: {supplementSMD.republican_vote_share}%
            <br />
            Democratic Vote Share: {supplementSMD.democratic_vote_share}%
            <br />
          </p>
        </div>
      </div>
    </>
  );
};

import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { BarChartOptions } from "../../../utils/Constants";
import { getSmdEnsembleSummaryData, getMmdEnsembleSummaryData } from "../../../axiosClient";

export const BarChart = ({ state }) => {
  const [summaryData, setSummaryData] = useState(null);
  const [valueForDropdown, setValueForDropdown] = useState(BarChartOptions.RangeOfOpportunityDistricts);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const smdData = await getSmdEnsembleSummaryData(state);
        setSummaryData(smdData);
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

  const renderBarChart = (dataObject, title, xAxisLabel, yAxisLabel) => {
    const chartData = prepareChartData(dataObject);

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
          },
          yaxis: {
            title: { text: yAxisLabel, font: { size: 12 } },
            automargin: true,
          },
          margin: { t: 40, l: 50, r: 20, b: 60 },
          responsive: true,
        }}
        style={{ width: "300px", height: "250px" }}
      />
    );
  };

  if (!summaryData) {
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
            <div style={{ display: "flex", gap: "20px" }}>
              {renderBarChart(
                summaryData.range_of_opportunity_representatives,
                "SMD Opportunity Representatives",
                "Opportunity Representatives",
                "Frequency"
              )}
            </div>
          </>
        )}
        {valueForDropdown === BarChartOptions.RepublicanDemocraticSplit && (
          <>
            <h1 className="barChartHeader">Frequency of Republican-Democratic Splits</h1>
            <div style={{ display: "flex", gap: "20px" }}>
              {renderBarChart(
                summaryData.republican_democratic_split_frequency,
                "SMD Republican-Democratic Split",
                "Republican-Democratic Split",
                "Frequency"
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

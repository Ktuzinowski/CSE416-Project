import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import axios from "axios";

const BWGraph = ({ geojsonData }) => {
  const svgRef = useRef();
  const [voteData, setVoteData] = useState([]);

  useEffect(() => {
    if (!geojsonData) return;

    // Function to fetch vote data for each district
    const fetchVoteData = async () => {
      try {
        const updatedVoteData = await Promise.all(
          geojsonData.features.map(async (d) => {
            const districtId = d.properties.DISTRICT;
            const response = await axios.get(
              `http://localhost:8080/district/${districtId}/votes`
            );
            const { republicanPercentage, democratPercentage } = response.data;
            return {
              district: districtId,
              repPercentage: republicanPercentage / 100, // Convert to fraction
              demPercentage: democratPercentage / 100,  // Convert to fraction
            };
          })
        );
        setVoteData(updatedVoteData);
      } catch (error) {
        console.error("Error fetching vote data:", error);
      }
    };

    fetchVoteData();
  }, [geojsonData]);

  useEffect(() => {
    if (!voteData.length) return;

    const margin = { top: 30, right: 180, bottom: 50, left: 100 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Remove any existing SVG to avoid overlapping
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const districts = [...new Set(voteData.map((d) => d.district))];

    // Scales
    const x = d3.scaleBand().domain(districts).range([0, width]).padding(0.2);
    const y = d3.scaleLinear().domain([0, 1]).range([height, 0]); // Scale for percentage values

    // X-axis
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickFormat((d) => `District ${d}`));

    // Y-axis
    svg
      .append("g")
      .call(d3.axisLeft(y).tickFormat(d3.format(".0%"))); // Format ticks as percentage

    // Function to calculate IQR and identify outliers
    const calculateIQR = (arr) => {
      const sorted = arr.sort((a, b) => a - b);
      const q1 = d3.quantile(sorted, 0.25);
      const q3 = d3.quantile(sorted, 0.75);
      const iqr = q3 - q1;
      const lowerFence = q1 - 1.5 * iqr;
      const upperFence = q3 + 1.5 * iqr;
      return {
        lowerFence,
        upperFence,
        q1,
        q3,
      };
    };

    // Box plot for each district
    districts.forEach((district) => {
      const districtData = voteData.filter((d) => d.district === district);
      const repPercentages = districtData.map((d) => d.repPercentage);
      const demPercentages = districtData.map((d) => d.demPercentage);

      const combinedPercentages = [...repPercentages, ...demPercentages];
      const combinedIQR = calculateIQR(combinedPercentages);

      const boxX = x(district) + x.bandwidth() / 4;
      const boxWidth = x.bandwidth() * 0.4;

      // Draw the box
      svg
        .append("rect")
        .attr("x", x(district) + (x.bandwidth() - boxWidth) / 2)
        .attr("y", y(combinedIQR.q3))
        .attr("height", y(combinedIQR.q1) - y(combinedIQR.q3))
        .attr("width", boxWidth)
        .attr("stroke", "black")
        .attr("fill", "transparent")
        .attr("opacity", 0.5)
        .attr("stroke-width", 2);

      // Whiskers
      svg
        .append("line")
        .attr(
          "x1",
          x(district) + (x.bandwidth() - boxWidth) / 2 + boxWidth / 2
        )
        .attr("x2", x(district) + (x.bandwidth() - boxWidth) / 2 + boxWidth / 2)
        .attr("y1", y(combinedIQR.lowerFence))
        .attr("y2", y(combinedIQR.q1))
        .attr("stroke", "black")
        .attr("stroke-width", 2);

      svg
        .append("line")
        .attr(
          "x1",
          x(district) + (x.bandwidth() - boxWidth) / 2 + boxWidth / 2
        )
        .attr("x2", x(district) + (x.bandwidth() - boxWidth) / 2 + boxWidth / 2)
        .attr("y1", y(combinedIQR.upperFence))
        .attr("y2", y(combinedIQR.q3))
        .attr("stroke", "black")
        .attr("stroke-width", 2);

      // Median
      const median = d3.median(combinedPercentages);
      svg
        .append("line")
        .attr("x1", x(district) + (x.bandwidth() - boxWidth) / 2)
        .attr("x2", x(district) + (x.bandwidth() - boxWidth) / 2 + boxWidth)
        .attr("y1", y(median))
        .attr("y2", y(median))
        .attr("stroke", "black")
        .attr("stroke-width", 2);

      // Plot points for Republican and Democrat percentages
      districtData.forEach((d) => {
        svg
          .append("circle")
          .attr("cx", x(district) + x.bandwidth() / 2)
          .attr("cy", y(d.repPercentage))
          .attr("r", 3)
          .attr("fill", "red");

        svg
          .append("circle")
          .attr("cx", x(district) + x.bandwidth() / 2)
          .attr("cy", y(d.demPercentage))
          .attr("r", 3)
          .attr("fill", "blue");
      });
    });

    // Add chart title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .style("font-weight", "bold")
      .text("SMD Election Votes");

    // Legend
    const legend = svg
      .append("g")
      .attr("class", "legend")
      .attr("transform", `translate(${width + 20}, ${margin.top})`);

    legend
      .append("circle")
      .attr("cx", 10)
      .attr("cy", 6)
      .attr("r", 6)
      .attr("fill", "red");
    legend.append("text").attr("x", 20).attr("y", 12).text("Republican Votes");

    legend
      .append("circle")
      .attr("cx", 10)
      .attr("cy", 26)
      .attr("r", 6)
      .attr("fill", "blue");
    legend.append("text").attr("x", 20).attr("y", 32).text("Democrat Votes");
  }, [voteData]);

  return <svg ref={svgRef}></svg>;
};

export default BWGraph;

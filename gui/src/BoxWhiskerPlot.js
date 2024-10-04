import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const BWGraph = ({ geojsonData }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!geojsonData) return;

    // Function to calculate the percentage of Republican and Democrat votes
    const calculateVotePercentages = (data) => {
      return data.map((d) => ({
        district: d.properties.DISTRICT,
        repPercentage: d.properties.G20PRERTRU / (865140 + 560282),
        demPercentage: d.properties.G20PREDBID / (865140 + 560282),
      }));
    };

    // Calculate vote percentages from the data
    const percentages = calculateVotePercentages(geojsonData.features);

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

    // Prepare data for box plot (for each district)
    const districts = [...new Set(percentages.map((d) => d.district))]; // Extract unique districts

    // Scales
    const x = d3.scaleBand().domain(districts).range([0, width]).padding(0.2);
    const y = d3.scaleLinear().domain([0, 1]).range([height, 0]); // Percentage values for vote percentages

    // X-axis
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickFormat((d) => `District ${d}`));

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

    // Box plot data per district
    districts.forEach((district) => {
      const districtData = percentages.filter((d) => d.district === district);
      const repPercentages = districtData.map((d) => d.repPercentage);
      const demPercentages = districtData.map((d) => d.demPercentage);

      // Combine both percentages for box plot calculation
      const combinedPercentages = [...repPercentages, ...demPercentages];
      const combinedIQR = calculateIQR(combinedPercentages);

      // Draw box for combined data
      const boxX = x(district) + x.bandwidth() / 4;
      const boxWidth = x.bandwidth() * 0.4;
      const lineLength = boxWidth / 4;

      // Draw box for combined data
      svg
        .append("rect")
        .attr("x", x(district) + (x.bandwidth() - boxWidth) / 2) // Center the box
        .attr("y", y(combinedIQR.q3))
        .attr("height", y(combinedIQR.q1) - y(combinedIQR.q3))
        .attr("width", boxWidth) // Use the new smaller width
        .attr("stroke", "black")
        .attr("fill", "transparent") // Color for the box
        .attr("opacity", 0.5)
        .attr("stroke-width", 2); // Set the border width

      // Draw whiskers for the combined box plot
      // Draw whiskers for the combined box plot
      svg
        .append("line")
        .attr("x1", x(district) + (x.bandwidth() - boxWidth) / 2 + boxWidth / 2)
        .attr("x2", x(district) + (x.bandwidth() - boxWidth) / 2 + boxWidth / 2)
        .attr("y1", y(combinedIQR.lowerFence)) // Set to lower whisker
        .attr("y2", y(combinedIQR.q1)) // Set to top of box
        .attr("stroke", "black")
        .attr("stroke-width", 2); // Set the border width

      svg
        .append("line")
        .attr("x1", x(district) + (x.bandwidth() - boxWidth) / 2 + boxWidth / 2)
        .attr("x2", x(district) + (x.bandwidth() - boxWidth) / 2 + boxWidth / 2)
        .attr("y1", y(combinedIQR.upperFence)) // Set to upper whisker
        .attr("y2", y(combinedIQR.q3)) // Set to bottom of box
        .attr("stroke", "black")
        .attr("stroke-width", 2); // Set the border width

      // Draw median line
      const median = d3.median(combinedPercentages);
      svg
        .append("line")
        .attr("x1", x(district) + (x.bandwidth() - boxWidth) / 2) // Start from left side of the box
        .attr("x2", x(district) + (x.bandwidth() - boxWidth) / 2 + boxWidth) // End at right side of the box
        .attr("y1", y(median))
        .attr("y2", y(median))
        .attr("stroke", "black")
        .attr("stroke-width", 2); // Set the border width

      // Draw lines for lower and upper fences
      svg
        .append("line")
        .attr(
          "x1",
          x(district) +
            (x.bandwidth() - boxWidth) / 2 +
            boxWidth / 2 -
            lineLength / 1.5
        )
        .attr(
          "x2",
          x(district) +
            (x.bandwidth() - boxWidth) / 2 +
            boxWidth / 2 +
            lineLength / 1.5
        )
        .attr("y1", y(combinedIQR.lowerFence))
        .attr("y2", y(combinedIQR.lowerFence))
        .attr("stroke", "black")
        .attr("stroke-width", 2) // Solid line for lower fence
        .attr("stroke-dasharray", "none"); // Solid line

      svg
        .append("line")
        .attr(
          "x1",
          x(district) +
            (x.bandwidth() - boxWidth) / 2 +
            boxWidth / 2 -
            lineLength / 1.5
        )
        .attr(
          "x2",
          x(district) +
            (x.bandwidth() - boxWidth) / 2 +
            boxWidth / 2 +
            lineLength / 1.5
        )
        .attr("y1", y(combinedIQR.upperFence))
        .attr("y2", y(combinedIQR.upperFence))
        .attr("stroke", "black")
        .attr("stroke-width", 2) // Solid line for upper fence
        .attr("stroke-dasharray", "none"); // Solid line

      // Plot all points (Republican and Democrat)
      districtData.forEach((d) => {
        const repIsOutlier =
          d.repPercentage < combinedIQR.lowerFence ||
          d.repPercentage > combinedIQR.upperFence;
        const demIsOutlier =
          d.demPercentage < combinedIQR.lowerFence ||
          d.demPercentage > combinedIQR.upperFence;

        // Plot Republican point
        svg
          .append("circle")
          .attr("cx", x(district) + x.bandwidth() / 2) // Republican point centered
          .attr("cy", y(d.repPercentage))
          .attr("r", 3)
          .attr("fill", repIsOutlier ? "pink" : "red");

        // Plot Democrat point
        svg
          .append("circle")
          .attr("cx", x(district) + x.bandwidth() / 2) // Democrat point centered
          .attr("cy", y(d.demPercentage))
          .attr("r", 3)
          .attr("fill", demIsOutlier ? "skyblue" : "blue");

        svg
          .append("g")
          .attr("class", "y-axis")
          .call(
            d3.axisLeft(y).tickValues(d3.range(0.1, 1.1, 0.1)) // Set tick values in increments of 0.1 (10%)
          )
          .selectAll("text")
          .style("font-size", "14px");

        svg
          .append("text")
          .attr("class", "y-axis-label")
          .attr("text-anchor", "middle")
          .attr("transform", `translate(-50,${height / 2})rotate(-90)`)
          .text("Percentages")
          .style("font-size", "16px")
          .style("font-weight", "bold");
      });
    });

    // Create legend
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", -10) // Position above the plot
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .style("font-weight", "bold")
      .text("SMD Election Votes");

    // Add legend (outside the plot)
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
  }, [geojsonData]);

  return <svg ref={svgRef}></svg>;
};

export default BWGraph;

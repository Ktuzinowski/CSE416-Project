import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export const MMDBarChartGraph = ({ data }) => {
    const svgRef = useRef();

    useEffect(() => {
        // Data: number of representatives for each district in Utah (4 districts)
        const data = [
            { district: 1, Democrat: 1, Republican: 3 }
        ];

        const margin = { top: 70, right: 130, bottom: 50, left: 60 }; // Increase right margin
        const width = 500 - margin.left - margin.right;
        const height = 320 - margin.top - margin.bottom;
        
        // Create an SVG container
        const svg = d3.select(svgRef.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Add title
        svg.append("text")
        .attr("x", (width / 2)) // Center the title
        .attr("y", -margin.top / 2) // Position slightly above the chart
        .attr("text-anchor", "middle")
        .style("font-size", "1.5rem")
        .style("font-weight", "bold")
        .text("Utah MMD Election Results");

        // X scale for districts (categorical scale)
        const x0 = d3.scaleBand()
            .domain(data.map(d => d.district))
            .range([0, width])
            .padding(0.2);

        // X scale for Democrat and Republican within each district
        const x1 = d3.scaleBand()
            .domain(['Democrat', 'Republican'])
            .range([0, x0.bandwidth()])
            .padding(0.05);

        // Y scale for the number of representatives
        const y = d3.scaleLinear()
            .domain([0, 3]) // Assuming the max number of reps in any district is 3
            .nice()
            .range([height, 0]);

        // Define color for the bars
        const color = d3.scaleOrdinal()
            .domain(['Democrat', 'Republican'])
            .range(['#1f77b4', '#B22234']); // Blue for Democrat, Orange for Republican

        // X Axis
        const xAxis = svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x0).tickFormat(d => `District ${d}`));

        // Increase font size for x-axis ticks
        xAxis.selectAll("text")
        .style("font-size", "0.8rem"); // Set desired font size here

        // Y Axis
        svg.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(y).ticks(3));

        // Add Y Axis Label
        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("transform", `translate(${-margin.left / 2},${height / 2})rotate(-90)`)
            .style("font-size", "1.1rem")
            .text("Representatives");

        // Draw the bars
        svg.append("g")
            .selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("transform", d => `translate(${x0(d.district)},0)`)
            .selectAll("rect")
            .data(d => ['Democrat', 'Republican'].map(key => ({ key, value: d[key] })))
            .enter()
            .append("rect")
            .attr("x", d => x1(d.key))
            .attr("y", d => y(d.value))
            .attr("width", x1.bandwidth())
            .attr("height", d => height - y(d.value))
            .attr("fill", d => color(d.key));

        // Add a legend
        const legend = svg.append("g")
            .attr("class", "legend")
            .attr("transform", `translate(${width}, ${-margin.top / 2 + 15})`); // Adjust positioning

        // Legend items
        const parties = ['Democrat', 'Republican'];
        const legendSpacing = 25;

        legend.selectAll('rect')
            .data(parties)
            .enter()
            .append('rect')
            .attr('x', 0)
            .attr('y', (d, i) => i * legendSpacing)
            .attr('width', 18)
            .attr('height', 18)
            .attr('fill', d => color(d));

        // Legend text
        legend.selectAll('text')
            .data(parties)
            .enter()
            .append('text')
            .attr('x', 24)
            .attr('y', (d, i) => i * legendSpacing + 15)
            .style('font-size', '1rem')
            .text(d => d);

    }, []);

    return (
        <div>
            <svg ref={svgRef}></svg>
        </div>
    );
};
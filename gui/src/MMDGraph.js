import React, { useEffect } from 'react';
import * as d3 from 'd3';

const MMDGraph = () => {
    useEffect(() => {
        // Remove any previous SVG elements
        d3.select('#mmdGraph').selectAll('*').remove();

        const data = [8, 3, 10, 7, 9, 4]; // Dummy data
        const width = 300;
        const height = 150;
        const svg = d3.select('#mmdGraph')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .style('background-color', '#f4f4f4')
            .style('border', '1px solid black');

        svg.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', (d, i) => i * 40)
            .attr('y', d => height - d * 10)
            .attr('width', 30)
            .attr('height', d => d * 10)
            .attr('fill', 'green');
    }, []); // Empty dependency array ensures this runs once when the component mounts

    return <div id="mmdGraph"></div>;
};

export default MMDGraph;

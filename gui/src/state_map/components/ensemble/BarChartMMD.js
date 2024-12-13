import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import { OpportunityRepresentativeJSON, RangeOfSplitsJSON } from "../../../utils/Constants";
import { getMmdEnsembleSummaryData } from "../../../axiosClient";

export const BarChartMMD = ({ state }) => {
    const opportunityChartRef = useRef();
    const rangeOfSplitsChartRef = useRef();
    const [summaryData, setSummaryData] = useState(null);

    useEffect(() => {
        const loadSummaryData = async () => {
            try {
                const data = await getMmdEnsembleSummaryData(state);
                setSummaryData(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching summary data:", error);
            }
        };
        loadSummaryData();

        const createBarChart = (chartRef, dataJSON, chartWidth, chartHeight, xAxisLabel, yAxisLabel) => {
            d3.select(chartRef).selectAll("*").remove();

            const data = Object.entries(dataJSON).map(([key, value]) => ({
                label: key,
                value: value,
            }));

            const margin = { top: 20, right: 20, bottom: 70, left: 70 };
            const svg = d3
                .select(chartRef)
                .append("svg")
                .attr("width", chartWidth)
                .attr("height", chartHeight);

            const xScale = d3
                .scaleBand()
                .domain(data.map((d) => d.label))
                .range([margin.left, chartWidth - margin.right])
                .padding(0.1);

            const yScale = d3
                .scaleLinear()
                .domain([0, d3.max(data, (d) => d.value)])
                .nice()
                .range([chartHeight - margin.bottom, margin.top]);

            svg
                .append("g")
                .attr("transform", `translate(0, ${chartHeight - margin.bottom})`)
                .call(d3.axisBottom(xScale))
                .selectAll("text")
                .attr("transform", "rotate(-45)")
                .style("text-anchor", "end");

            svg
                .append("text")
                .attr("x", chartWidth / 2)
                .attr("y", chartHeight - 20)
                .attr("text-anchor", "middle")
                .style("font-size", "14px")
                .text(xAxisLabel);

            svg
                .append("g")
                .attr("transform", `translate(${margin.left}, 0)`)
                .call(d3.axisLeft(yScale));

            svg
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("x", -chartHeight / 2)
                .attr("y", 20)
                .attr("text-anchor", "middle")
                .style("font-size", "14px")
                .text(yAxisLabel);

            svg
                .selectAll(".bar")
                .data(data)
                .enter()
                .append("rect")
                .attr("class", "bar")
                .attr("x", (d) => xScale(d.label))
                .attr("y", (d) => yScale(d.value))
                .attr("width", xScale.bandwidth())
                .attr("height", (d) => chartHeight - margin.bottom - yScale(d.value))
                .attr("fill", "steelblue");

            svg
                .selectAll(".label")
                .data(data)
                .enter()
                .append("text")
                .attr("x", (d) => xScale(d.label) + xScale.bandwidth() / 2)
                .attr("y", (d) => yScale(d.value) - 5)
                .attr("text-anchor", "middle")
                .text((d) => d.value)
                .style("font-size", "12px")
                .style("fill", "black");
        };

        createBarChart(
            opportunityChartRef.current,
            OpportunityRepresentativeJSON,
            500,
            300,
            "Number of Opportunity Representatives",
            "Frequency"
        );

        createBarChart(
            rangeOfSplitsChartRef.current,
            RangeOfSplitsJSON,
            500,
            300,
            "Republican-Democratic Split",
            "Frequency"
        );
    }, [state]);

    return (
        <>
            <h1 className="barChartHeader">Range of Opportunity Representatives</h1>
            <div ref={opportunityChartRef} />
            <h1 className="barChartHeader">Frequency of Republican-Democratic Splits</h1>
            <div ref={rangeOfSplitsChartRef} />
        </>
    );
};

export default BarChartMMD;

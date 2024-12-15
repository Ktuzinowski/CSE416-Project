export const processPlotDataMMD = (data) => {
    const traces = [];
    const annotations = [];
    const shapes = [];
    const bins = data.bins;

    let maxY = -Infinity; // Track the maximum Y value for annotation positioning.
    let minY = Infinity; // Track the minimum Y value for annotation positioning.

    bins.forEach((binData) => {
        Object.entries(binData).forEach(([key, districts]) => {
            districts.forEach((district) => {
                traces.push({
                    type: "box",
                    name: `Bin ${district.bin}`,
                    x: [district.bin],
                    q1: [district.q1],
                    median: [district.median],
                    q3: [district.q3],
                    lowerfence: [district.min],
                    upperfence: [district.max],
                    boxpoints: false,
                    showlegend: false,
                    fillcolor: "white",
                    line: {
                        color: "black",
                        width: 1.5
                    }
                });

                maxY = Math.max(maxY, district.max);
                minY = Math.min(minY, district.min);
            });
        });
    });

    bins.forEach((binData) => {
        Object.entries(binData).forEach(([key, districts]) => {
            districts.forEach((district) => {
                annotations.push({
                    x: district.bin,
                    y: maxY + 0.025, // Position slightly above the highest value.
                    text: `${key} Reps`,
                    font: {
                        size: 12,
                        color: "black"
                    },
                    showarrow: false,
                    xref: "x",
                    yref: "y"
                });
        
                // Add a vertical dashed line after each bin.
                shapes.push({
                    type: "line",
                    x0: district.bin + 0.5, // Start of the line (between bins).
                    x1: district.bin + 0.5, // End of the line (same x-coordinate).
                    y0: minY, // Start at the bottom of the Y-axis.
                    y1: maxY + 0.01, // Extend slightly above the max value.
                    line: {
                        color: "gray",
                        width: 1,
                        dash: "dash"
                    }
                });
            })
        });
    });
    shapes.pop(); // remove last line

    return { traces, annotations, shapes };
};

export const processPlotDataSMD = (data) => {
    const bins = data.bins;
    const currentDistricts = data.current_districts;

    // Prepare data for the box-and-whisker plot
    const boxData = bins.map((bin) => ({
        type: "box",
        name: `${bin.bin}`,
        x: [`${bin.bin}`], // Assign the district name as the x-axis value
        q1: [bin.q1],
        median: [bin.median],
        q3: [bin.q3],
        lowerfence: [bin.min],
        upperfence: [bin.max],
        boxpoints: false, // Hide individual points
        showlegend: false, // Exclude the box trace from the legend
        fillcolor: "white", // Fill color for the box
        line: {
            color: "black", // Border color for the box
            width: 1.5 // Width of the border
        }
    }));

    // Prepare data for the enacted district plans
    const enactedData = {
        type: "scatter",
        mode: "markers",
        name: "Enacted District Plan",
        x: [], // Placeholder for bin names
        y: [], // Placeholder for district values
        marker: { color: "red", size: 8, symbol: "circle" },
    };

    bins.forEach((bin) => {
        const point = currentDistricts.find((district) => district.district === bin.bin);

        enactedData.x.push(`${bin.bin}`);
        enactedData.y.push(point.value);
        
    });

    // Combine data
    const plotData = [...boxData, enactedData]

    return plotData;
}
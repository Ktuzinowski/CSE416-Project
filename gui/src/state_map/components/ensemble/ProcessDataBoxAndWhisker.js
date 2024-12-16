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

export const combinePlotData = (smdData, mmdData) => {
    const traces = [];
    const annotations = [];
    const shapes = [];
    const bins = mmdData.bins;
    const binsSmd = smdData.bins;
    const currentDistricts = smdData.current_districts;

    let maxYSMD = -Infinity;
    let minYSMD = Infinity;

    // Combine x-axis labels for SMD and MMD
    const smdLabels = binsSmd.map(bin => `SMD Bin ${bin.bin}`);
    const mmdLabels = bins.flatMap(binData =>
        Object.entries(binData).flatMap(([key, districts]) =>
            districts.map(district => `MMD Bin ${district.bin}`)
        )
    );

    const xLabels = [...smdLabels, ...mmdLabels];

    // Prepare the enacted district plan scatter plot data
    const enactedData = {
        type: "scatter",
        mode: "markers",
        name: "Enacted District Plan",
        x: [],
        y: [],
        marker: { color: "red", size: 8, symbol: "circle" },
    };

    binsSmd.forEach(bin => {
        const point = currentDistricts.find(district => district.district === bin.bin);
        if (point) {
            enactedData.x.push(`SMD Bin ${bin.bin}`);
            enactedData.y.push(point.value);

            maxYSMD = Math.max(maxYSMD, point.value);
            minYSMD = Math.min(minYSMD, point.value);
        }
    });

    traces.push(enactedData);

    // Add SMD Districts box plots
    binsSmd.forEach(bin => {
        maxYSMD = Math.max(maxYSMD, bin.max);
        minYSMD = Math.min(minYSMD, bin.min);
        traces.push({
            type: "box",
            name: "SMD Districts",
            x: [`SMD Bin ${bin.bin}`],
            q1: [bin.q1],
            median: [bin.median],
            q3: [bin.q3],
            lowerfence: [bin.min],
            upperfence: [bin.max],
            boxpoints: false,
            showlegend: bin.bin === binsSmd[0].bin,
            legendgroup: "SMD Districts",
            fillcolor: "rgba(255, 255, 255, 0.3)",
            line: { color: "black", width: 1.5 },
        });
    });

    let maxYMMD = -Infinity
    let minYMMD = Infinity

    // Add MMD Districts box plots
    bins.forEach(binData => {
        
        Object.entries(binData).forEach(([key, districts]) => {
            districts.forEach(district => {
                traces.push({
                    type: "box",
                    name: "MMD Districts",
                    x: [`MMD Bin ${district.bin}`],
                    q1: [district.q1],
                    median: [district.median],
                    q3: [district.q3],
                    lowerfence: [district.min],
                    upperfence: [district.max],
                    boxpoints: false,
                    showlegend: district.bin === 1,
                    legendgroup: "MMD",
                    fillcolor: "rgba(0, 255, 255, 0.3)",
                    line: { color: "black", width: 1.5 },
                });

                maxYMMD = Math.max(maxYMMD, district.max);
                minYMMD = Math.min(minYMMD, district.min);
            });
        });
    });

    bins.forEach(binData => {
        Object.entries(binData).forEach(([key, districts]) => {
            districts.forEach(district => {
                annotations.push({
                    x: `MMD Bin ${district.bin}`,
                    y: maxYMMD + 0.015,
                    text: `${key} Reps`,
                    font: { size: 12, color: "black" },
                    showarrow: false,
                    xref: "x",
                    yref: "y",
                });
            });
        });
    });

    // Add dashed line separating SMD and MMD
    shapes.push({
        type: "line",
        x0: smdLabels.length - 0.5, // Boundary between SMD and MMD
        x1: smdLabels.length - 0.5,
        y0: (minYSMD < minYMMD ? minYSMD : minYMMD),
        y1: (maxYSMD > maxYMMD ? maxYSMD : maxYMMD) + 0.01,
        line: { color: "gray", width: 2, dash: "dash" },
    });

    return {
        traces,
        annotations,
        shapes,
        layout: {
            xaxis: {
                type: "category",
                categoryorder: "array",
                categoryarray: xLabels,
            },
        },
    };
};





import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const SMDGraph = () => {
  const smdChartRef = useRef(null);
  const smdChartInstance = useRef(null); // Store the SMD chart instance

  // Cubic spline interpolation function
  const cubicSpline = (x, y, numPoints) => {
    const n = x.length;
    const h = new Array(n - 1);
    const a = y.slice();

    for (let i = 0; i < n - 1; i++) {
      h[i] = x[i + 1] - x[i];
    }

    const alpha = new Array(n - 1);
    for (let i = 1; i < n - 1; i++) {
      alpha[i] =
        (3 / h[i]) * (a[i + 1] - a[i]) - (3 / h[i - 1]) * (a[i] - a[i - 1]);
    }

    const l = new Array(n);
    const mu = new Array(n);
    const z = new Array(n);

    l[0] = 1;
    mu[0] = 0;
    z[0] = 0;

    for (let i = 1; i < n - 1; i++) {
      l[i] = 2 * (x[i + 1] - x[i - 1]) - h[i - 1] * mu[i - 1];
      mu[i] = h[i] / l[i];
      z[i] = (alpha[i] - h[i - 1] * z[i - 1]) / l[i];
    }

    l[n - 1] = 1;
    z[n - 1] = 0;
    let c = new Array(n);
    c[n - 1] = 0;

    for (let j = n - 2; j >= 0; j--) {
      c[j] = z[j] - mu[j] * c[j + 1];
    }

    const b = new Array(n - 1);
    const d = new Array(n - 1);
    for (let i = 0; i < n - 1; i++) {
      b[i] = (a[i + 1] - a[i]) / h[i] - (h[i] * (c[i + 1] + 2 * c[i])) / 3;
      d[i] = (c[i + 1] - c[i]) / (3 * h[i]);
    }

    const interpolated = [];
    const xStep = (x[n - 1] - x[0]) / numPoints;

    for (let i = 0; i < numPoints; i++) {
      const xi = x[0] + i * xStep;
      let j = 0;

      while (j < n - 1 && xi > x[j + 1]) {
        j++;
      }

      const dx = xi - x[j];
      const value = a[j] + b[j] * dx + c[j] * dx * dx + d[j] * dx * dx * dx;
      interpolated.push(value);
    }

    return interpolated;
  };

  useEffect(() => {
    const smdVotes = Array.from({ length: 101 }, (_, i) => i); // Vote percentages from 0 to 100

    // Points for Democrats and Republicans, starting at (0, 0)
    const demPoints = [
      { x: 0, y: 0 }, // Start at (0, 0)
      { x: 10, y: 20 },
      { x: 20, y: 30 },
      { x: 30, y: 36 },
      { x: 50, y: 40 },
      { x: 70, y: 47 },
      { x: 80, y: 56 },
      { x: 90, y: 70 },
      { x: 100, y: 100 },
    ];

    const repPoints = [
      { x: 0, y: 0 }, // Start at (0, 0)
      { x: 10, y: 30 },
      { x: 20, y: 45 },
      { x: 30, y: 57 },
      { x: 50, y: 60 },
      { x: 70, y: 63 },
      { x: 80, y: 67 },
      { x: 90, y: 80 },
      { x: 100, y: 100 },
    ];

    // Extract x and y values from the points for interpolation
    const demX = demPoints.map((p) => p.x);
    const demY = demPoints.map((p) => p.y);
    const repX = repPoints.map((p) => p.x);
    const repY = repPoints.map((p) => p.y);

    // Interpolate using cubic spline
    const smdSeatsDems = cubicSpline(demX, demY, 100); // 100 points for smoother curve
    const smdSeatsReps = cubicSpline(repX, repY, 100); // 100 points for smoother curve

    // SMD Chart
    const ctxSMD = smdChartRef.current.getContext("2d");

    // Destroy the existing chart if it exists
    if (smdChartInstance.current) {
      smdChartInstance.current.destroy();
    }

    // Create a new SMD chart instance
    smdChartInstance.current = new Chart(ctxSMD, {
      type: "line",
      data: {
        labels: smdVotes,
        datasets: [
          {
            label: "SMD Democrats",
            data: smdSeatsDems,
            borderColor: "blue",
            fill: false,
            borderWidth: 1,
            tension: 0.4,
            pointRadius: 0,
          },
          {
            label: "SMD Republicans",
            data: smdSeatsReps,
            borderColor: "red",
            fill: false,
            borderWidth: 1,
            tension: 0.4,
            pointRadius: 0,
          },
        ],
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: "Vote Percentage",
            },
            ticks: {
              stepSize: 20,
            },
          },
          y: {
            title: {
              display: true,
              text: "Seat Percentage",
            },
            min: 0,
            max: 100,
            ticks: {
              stepSize: 20,
            },
          },
        },
      },
    });

    // Cleanup chart instance on component unmount
    return () => {
      if (smdChartInstance.current) {
        smdChartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div>
      <h2>SMD Graph</h2>
      <canvas ref={smdChartRef} width="400" height="200"></canvas>
    </div>
  );
};

export default SMDGraph;

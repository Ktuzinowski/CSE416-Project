import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const MMDVoter = () => {
  const mmdChartRef = useRef(null);
  const mmdChartInstance = useRef(null);

  useEffect(() => {
    const mmdVotes = Array.from({ length: 101 }, (_, i) => i);
    const mmdSeatsDems = mmdVotes.map((v) => v);
    const mmdSeatsReps = mmdVotes.map((v) => v);

    const ctxMMD = mmdChartRef.current.getContext("2d");

    if (mmdChartInstance.current) {
      mmdChartInstance.current.destroy();
    }

    mmdChartInstance.current = new Chart(ctxMMD, {
      type: "line",
      data: {
        labels: mmdVotes,
        datasets: [
          {
            label: "MMD Democrats",
            data: mmdSeatsDems,
            borderColor: "blue",
            fill: false,
            borderWidth: 1,
            pointRadius: 0,
          },
          {
            label: "MMD Republicans",
            data: mmdSeatsReps,
            borderColor: "red",
            fill: false,
            borderWidth: 2,
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

    return () => {
      if (mmdChartInstance.current) {
        mmdChartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div>
      <h2>MMD Graph</h2>
      <canvas ref={mmdChartRef} width="400" height="200"></canvas>
    </div>
  );
};

export default MMDVoter;

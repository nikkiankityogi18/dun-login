import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = (cData) => {
  const data = {
    labels: ["Custom", "Category 1", "Category 2", "Category 3", "Category 4"],
    datasets: [
      {
        label: "chart",
        backgroundColor: "#f0c3f1",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "#f0c3f1",
        hoverBorderColor: "#f0c3f1",
        barThickness: 30,
        data: cData.chartData,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        ticks: {
          color: "white",
        },
      },
      y: {
        display: false,
        ticks: {
          color: "white",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="chart-border">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;

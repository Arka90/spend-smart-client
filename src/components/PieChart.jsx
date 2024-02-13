import { Box } from "@mui/material";
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJs.register(ArcElement, Tooltip, Legend);

const PieChart = ({ chartData }) => {
  const dataNums = [];
  const label = chartData.reduce((acc, curr) => {
    if (!acc.includes(curr.category)) {
      return [...acc, curr.category];
    }

    return [...acc];
  }, []);

  for (let i = 0; i < label.length; i++) {
    let category = label[i];
    const val = chartData.reduce((acc, curr) => {
      if (curr.category == category) {
        return acc + curr.amount;
      }

      return acc;
    }, 0);

    dataNums.push(val);
  }

  const data = {
    labels: label,
    datasets: [
      {
        label: "# income from",
        data: dataNums,
        backgroundColor: [
          "rgb(100,149,247)",
          "rgb(255,99,71)",
          "rgb(173,127,255)",
          "rgb(144,238,144)",
          "rgb(255,255,153)",
        ],
        borderColor: [
          "rgb(18, 55, 42)",
          "rgb(155, 68, 68)",
          "rgb(130, 3, 0)",
          "rgb(255, 152, 0)",
          "rgb(175, 38, 85)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box>
      <Pie data={data} />
    </Box>
  );
};

export default PieChart;

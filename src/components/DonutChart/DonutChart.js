import React from 'react';
import { Doughnut } from "react-chartjs-2";


const DoughnutChart = ({goalsDoneCount, goalsCount}) => {
  console.log('goalsDoneCount', goalsDoneCount)

  const data = {
    datasets: [
      {
        label: 'Sales',
        data: [goalsDoneCount, goalsCount-goalsDoneCount],
        backgroundColor: [
          'rgba(27, 191, 186, 0.5)',
          'rgba(188, 243, 241, 0.5)',
        ],
      }
    ]
  }
   const plugins = [{
     beforeDraw: function(chart) {
      let width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
          ctx.restore();
          let fontSize = (height / 160).toFixed(2);
          ctx.font = fontSize + "em sans-serif";
          ctx.textBaseline = "top";
          let text = `${goalsDoneCount}/${goalsCount}`,
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2;
          ctx.fillText(text, textX, textY);
          ctx.save();
     }
   }]

  return (
    <>
      <Doughnut data={data} type="doughnut" plugins={plugins} />
    </>
  )
};

export default DoughnutChart;
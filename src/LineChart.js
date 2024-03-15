import {Layout } from "antd";
import ReactEcharts from "echarts-for-react";
const LineChart = ({ ChartData }) => {
  const options = {
    title: {
      text: "Cryptocurrency timeseries 2",
      subtext: "",
      x: "center",
    },
    tooltip: {
      trigger: "item",
    },
    xAxis: {
      name: "Date",
      data: ChartData.xAxis.map((timestamp) =>
        new Date(timestamp).toLocaleString()
      ),
    },
    yAxis: { name: "Number" },
    series: [
      {
        type: "line",
        data: ChartData.yAxis,
      },
    ],
  };
  return (
    <>
      <Layout
        style={{
          height: 250,
          background: "white",
          margin: "0px 20px 20px 20px",
        }}
      >
        <ReactEcharts option={options} />
      </Layout>
    </>
  );
};

export default LineChart;

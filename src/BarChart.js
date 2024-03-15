
import {Layout } from "antd";
import ReactEcharts from "echarts-for-react";

const BarChart = ({ ChartData }) => {
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
      name: "Month",
      data: ChartData.xAxis,
    },
    yAxis: { name: "Number" },
    series: [
      {
        type: "bar",
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

export default BarChart;

import { useState, useEffect } from "react";
import Papa from "papaparse";
import "./App.css";
import "./MainLayout.css";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import datacsv from "./data.csv";
import { Select } from "antd";
import { Radio,Layout } from "antd";
import type { RadioChangeEvent } from "antd";

const MainLayout = () => {
  const [selectedColumn, setSelectedColumn] = useState("Open");
  const [chartType, setChartType] = useState("line");
  const [graphData, setGraphData] = useState({ xAxis: [], yAxis: [] });
  const [barGraphData, setBarGraphData] = useState({ xAxis: [], yAxis: [] });

  const handleModeChange = (e: RadioChangeEvent) => {
    setChartType(e.target.value);
  };
  const items = [
    {
      value: "Open",
      label: "Open",
    },
    {
      value: "High",
      label: "High",
    },
    {
      value: "Low",
      label: "Low",
    },
    {
      value: "Close",
      label: "Close",
    },
    {
      value: "Volume",
      label: "Volume",
    },
  ];

  useEffect(() => {
    Papa.parse(datacsv, {
      download: true,
      header: true,
      dynamicTyping: true,
      delimiter: "",
      complete: (result) => {
        console.log(result);
        const xAxisData = result.data.map((item) =>
          parseFloat(item["Unix Timestamp"])
        );
        const yAxisData = result.data.map((item) =>
          parseFloat(item[`${selectedColumn}`])
        );
        setGraphData({ xAxis: xAxisData, yAxis: yAxisData });
        const monthlyGroups = {};
        result.data.forEach((curr) => {
          if (curr["Date"]) {
            const [dateTime] = curr["Date"].split(" ");
            const [month, day, year] = dateTime.split("/");
            console.log(month, day, year);
            const key = `${month}/${year}`;

            if (!monthlyGroups[key]) {
              monthlyGroups[key] = [];
            }
            monthlyGroups[key].push(curr);
          }
        });

        const averages = Object.keys(monthlyGroups).map((key) => {
          const monthData = monthlyGroups[key];
          const totalOpen = monthData.reduce(
            (acc, curr) => acc + curr[`${selectedColumn}`],
            0
          );
          const averageOpen = totalOpen / monthData.length;
          return {
            month: key,
            averageOpen: parseFloat(averageOpen.toFixed(2)),
          };
        });

        const BarxAxisData = averages.map((entry) => entry.month);
        const BaryAxisData = averages.map((entry) => entry.averageOpen);
        setBarGraphData({ xAxis: BarxAxisData, yAxis: BaryAxisData });
      },
    });
    console.log(graphData);
  }, [selectedColumn]);

  const handleDropDown = (value) => {
    console.log(`selected ${value}`);
    setSelectedColumn(value);
  };

  return (
    <>
      <Layout className="heading_Layout">Time Series Data Visualization</Layout>
      <Layout className="Main_Layout">
        <Select
          defaultValue={selectedColumn}
          style={{ width: 120, margin: "40px 0px 0px 30px" }}
          onChange={handleDropDown}
          options={items}
        />
        <Radio.Group
          onChange={handleModeChange}
          value={chartType}
          style={{ marginBottom: 8, marginLeft: "auto", marginRight: "40px" }}
        >
          <Radio.Button value="line">Line</Radio.Button>
          <Radio.Button value="bar">Bar</Radio.Button>
        </Radio.Group>
        {chartType === "line" ? (
          <LineChart ChartData={graphData} />
        ) : (
          <BarChart ChartData={barGraphData} />
        )}
      </Layout>
    </>
  );
};

export default MainLayout;

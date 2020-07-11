import React from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import PropTypes from "prop-types";

import { Colors } from "../utility";

const CustomPieChart = ({ title, data }) => {
  const colorsArr = Object.keys(Colors).map((key) => Colors[key]);

  return (
    <div className="pie-chart-component">
      <h3 className="text-center mt-3">{title}</h3>
      {data.length === 0 ? (
        <p className="alert alert-light text-center no-record my-3">
          还没有任何数据
        </p>
      ) : (
        <ResponsiveContainer width={"100%"} height={300}>
          <PieChart>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={data}
              cx={"50%"}
              cy={"50%"}
              outerRadius={100}
              fill={Colors.blue}
              label
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={colorsArr[index % colorsArr.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

CustomPieChart.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default CustomPieChart;

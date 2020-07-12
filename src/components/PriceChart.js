import React from "react";
import PropTypes from "prop-types";

import PieChart from "./PieChart";
import { TYPE_INCOME, TYPE_OUTCOME } from "../utility";

const generateDataByCategory = (items, type) => {
  const categoryMap = {};
  items
    .filter((item) => item.category.type === type)
    .forEach((item) => {
      if (categoryMap[item.cid]) {
        categoryMap[item.cid].value += +item.price;
        categoryMap[item.cid].items.push(item.id);
      } else {
        categoryMap[item.cid] = {
          name: item.category.name,
          items: [item.id],
          value: +item.price,
        };
      }
    });

  return Object.keys(categoryMap).map((id) => categoryMap[id]);
};

const PriceChart = ({ items }) => {
  const incomeData = generateDataByCategory(items, TYPE_INCOME);
  const outcomeData = generateDataByCategory(items, TYPE_OUTCOME);

  return (
    <div className="price-chart-component">
      <PieChart title="本月支出" data={outcomeData} />
      <PieChart title="本月收入" data={incomeData} />
    </div>
  );
};

PriceChart.propTypes = {
  items: PropTypes.array.isRequired,
};

export default PriceChart;

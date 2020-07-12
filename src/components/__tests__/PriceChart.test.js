import React from "react";
import { mount } from "enzyme";

import PriceChart from "../PriceChart";
import PieChart from "../PieChart";
import {
  parseToYearAndMonth,
  flattenData,
  TYPE_INCOME,
  TYPE_OUTCOME,
} from "../../utility";
import { testItems, testCategories } from "../../testData";

const categories = flattenData(testCategories);
const currentDate = parseToYearAndMonth();
const currentMonthItems = testItems.filter((item) => {
  return item.monthCategory === `${currentDate.year}-${currentDate.month}`;
});

const itemsWithCategory = currentMonthItems.map((item) => {
  item.category = categories[item.cid];
  return item;
});

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

const props = {
  items: itemsWithCategory,
};

let wrapper;
describe("test <PriceChart />", () => {
  beforeEach(() => {
    wrapper = mount(<PriceChart {...props} />);
  });

  it("should render two pie charts", () => {
    expect(wrapper.find(PieChart).length).toEqual(2);
  });

  it("should render PieChart with correct params", () => {
    const incomeData = generateDataByCategory(itemsWithCategory, TYPE_INCOME);
    const outcomeData = generateDataByCategory(itemsWithCategory, TYPE_OUTCOME);
    expect(wrapper.find(PieChart).first().props()).toEqual({
      title: "本月支出",
      data: outcomeData,
    });
    expect(wrapper.find(PieChart).last().props()).toEqual({
      title: "本月收入",
      data: incomeData,
    });
  });
});

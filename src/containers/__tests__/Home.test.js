import React from "react";
import { mount } from "enzyme";

import { Home } from "../Home";
import { parseToYearAndMonth, flattenData } from "../../utility";
import { testCategories, testItems } from "../../testData";
import Loader from "../../components/Loader";
import MonthPicker from "../../components/MonthPicker";
import ViewTab from "../../components/ViewTab";
import PriceList from "../../components/PriceList";
import TotalPrice from "../../components/TotalPrice";

const currentDate = parseToYearAndMonth();
const currentMonthItems = testItems.filter((item) => {
  return item.monthCategory === `${currentDate.year}-${currentDate.month}`;
});

const initData = {
  items: {},
  categories: {},
  isLoading: false,
  currentDate: currentDate,
};

const withLoadedData = {
  items: flattenData(currentMonthItems),
  categories: flattenData(testCategories),
  isLoading: false,
  currentDate: currentDate,
};

const loadingData = {
  ...initData,
  isLoading: true,
};

const actions = {
  getInitialData: jest.fn().mockReturnValue(Promise.resolve("")),
};

describe("<Home /> test init behavior", () => {
  it("first render getInitialData should be triggered", () => {
    const wrapper = mount(<Home data={initData} actions={actions} />);
    expect(actions.getInitialData).toHaveBeenCalled();
  });

  it("should render Loader when isLoading is true", () => {
    const wrapper = mount(<Home data={loadingData} actions={actions} />);
    expect(wrapper.find(Loader).length).toEqual(1);
  });
});

describe("<Home /> test with loaded data", () => {
  it("should render correct date and tabView", () => {
    const wrapper = mount(<Home data={withLoadedData} actions={actions} />);
    const monthYear = parseToYearAndMonth();
    expect(wrapper.find(MonthPicker).props().year).toEqual(monthYear.year);
    expect(wrapper.find(MonthPicker).props().month).toEqual(monthYear.month);

    expect(wrapper.find(ViewTab).props().activeIndex).toEqual(0);
  });

  it("should render correct price items and totalIncome&totalOutcome", () => {
    const wrapper = mount(<Home data={withLoadedData} actions={actions} />);
    expect(wrapper.find(PriceList).props().items.length).toEqual(
      currentMonthItems.length
    );

    let totalIncome = 0;
    let totalOutcome = 0;
    const itemsWithCategory = currentMonthItems.map((item) => {
      item.category = flattenData(testCategories)[item.cid];
      return item;
    });
    itemsWithCategory.forEach((item) => {
      if (item.category.type === "income") {
        totalIncome += item.price;
      } else {
        totalOutcome += item.price;
      }
    });

    expect(wrapper.find(TotalPrice).props().totalIncome).toEqual(totalIncome);
    expect(wrapper.find(TotalPrice).props().totalOutcome).toEqual(totalOutcome);
  });
});

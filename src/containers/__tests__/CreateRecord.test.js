import React from "react";
import { mount } from "enzyme";

import { testCategories, testItems } from "../../testData";
import { flattenData, parseToYearAndMonth } from "../../utility";
import Loader from "../../components/Loader";
import CategorySelect from "../../components/CategorySelect";
import PriceForm from "../../components/PriceForm";
import CategoryViewTab from "../../components/CategoryViewTab";
import { CreateRecord } from "../CreateRecord";

const testItem = testItems[0];
const itemId = testItem.id;
const emptyId = "";

const initData = {
  categories: {},
  items: {},
  currentDate: parseToYearAndMonth(),
  isLoading: false,
};

const withLoadedData = {
  categories: flattenData(testCategories),
  items: flattenData(testItems),
  currentDate: parseToYearAndMonth(),
  isLoading: false,
};

const loadingData = {
  ...initData,
  isLoading: true,
};

const actions = {
  getEditData: jest.fn().mockReturnValue(
    Promise.resolve({
      categories: flattenData(testCategories),
      editItem: testItem,
    })
  ),
  createItem: jest.fn().mockReturnValue(Promise.resolve("")),
  updateItem: jest.fn().mockReturnValue(Promise.resolve()),
};

describe("<CreateRecord />: test init behavior", () => {
  it("first render should call getEditData with correct params", () => {
    const wrapper = mount(
      <CreateRecord data={initData} actions={actions} id={itemId} />
    );

    expect(actions.getEditData).toHaveBeenCalledWith(itemId);
  });

  it("should render Loader when isLoading is true", () => {
    const wrapper = mount(
      <CreateRecord data={loadingData} actions={actions} id={itemId} />
    );

    expect(wrapper.find(Loader).length).toEqual(1);
  });
});

describe("<CreateRecord />: test in create mode", () => {
  const wrapper = mount(
    <CreateRecord data={withLoadedData} actions={actions} id={emptyId} />
  );

  const setInputValue = (selector, newValue) => {
    wrapper.find(selector).instance().value = newValue;
  };

  it("render CategorySelect with null selectedCategory", () => {
    expect(wrapper.find(CategorySelect).props().selectedCategory).toEqual(null);
  });

  it("render PriceForm with empty item", () => {
    expect(wrapper.find(PriceForm).props().item).toEqual({});
  });

  it("submit form with empty values, createItem will not be triggered", () => {
    wrapper.find("form").simulate("submit");
    expect(actions.createItem).not.toHaveBeenCalled();
  });

  it("submit form with valid values, createItem will be triggered", () => {
    setInputValue("#title", "buy a coffee");
    setInputValue("#price", 50);
    setInputValue("#date", "2020-07-11");
    const newItem = {
      title: "buy a coffee",
      price: 50,
      date: "2020-07-11",
    };

    wrapper.find("form").simulate("submit");
    expect(actions.createItem).toHaveBeenCalledWith(
      newItem,
      testCategories[0].id
    );
  });
});

describe("<CreateRecord />: test in edit mode", () => {
  const wrapper = mount(
    <CreateRecord data={withLoadedData} actions={actions} id={itemId} />
  );

  const selectedCategory = testCategories.find((cg) => cg.id === testItem.cid);

  const setInputValue = (selector, newValue) => {
    wrapper.find(selector).instance().value = newValue;
  };

  it("render CategorySelect with right selectedCategory", () => {
    wrapper.update(); // force to re-render, update state

    expect(wrapper.find(CategorySelect).props().selectedCategory).toEqual(
      selectedCategory
    );
  });

  it("render CategoryViewTab with right tab", () => {
    const tab = selectedCategory.type === "outcome" ? 0 : 1;
    expect(wrapper.find(CategoryViewTab).props().activeIndex).toEqual(tab);
  });

  it("submit form with modified values, updateItem will be triggered", () => {
    setInputValue("#title", "new title");
    wrapper.find("form").simulate("submit");
    const modifiedData = {
      ...testItem,
      title: "new title",
    };

    expect(actions.updateItem).toHaveBeenCalledWith(
      modifiedData,
      selectedCategory.id
    );
  });
});

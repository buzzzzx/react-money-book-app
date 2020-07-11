import React from "react";
import { mount } from "enzyme";
import Ionicon from "react-ionicons";

import CategorySelect from "../CategorySelect";

const categories = [
  {
    id: 0,
    name: "旅游",
    type: "outcome",
    iconName: "ios-plane-outline",
  },
  {
    id: 1,
    name: "购物",
    type: "outcome",
    iconName: "ios-card-outline",
  },
  {
    id: 2,
    name: "理财",
    type: "income",
    iconName: "ios-basket-outline",
  },
];

const props = {
  categories,
  onSelectCategory: jest.fn(),
};

const propsWithSelected = {
  categories,
  onSelectCategory: jest.fn(),
  selectedCategory: categories[0],
};

describe("test <CategorySelect />", () => {
  it("should render correct category items without highlight item", () => {
    const wrapper = mount(<CategorySelect {...props} />);
    expect(wrapper.find(".category-item").length).toEqual(categories.length);
    expect(wrapper.find(".category-item.active").length).toEqual(0);

    const firstCategory = wrapper.find(".category-item").first();
    expect(firstCategory.find(Ionicon).prop("icon")).toEqual(
      categories[0].iconName
    );
  });

  it("should render correct category items with highlight item", () => {
    const wrapper = mount(<CategorySelect {...propsWithSelected} />);

    expect(wrapper.find(".category-item.active").length).toEqual(1);
    const firstCategory = wrapper.find(".category-item").first();
    expect(firstCategory.hasClass("active")).toEqual(true);
  });

  it("click item should trigger callback", () => {
    const wrapper = mount(<CategorySelect {...propsWithSelected} />);
    expect(wrapper.find(".category-item").at(0).hasClass("active")).toEqual(
      true
    );
    wrapper.find(".category-item").at(1).simulate("click");
    expect(propsWithSelected.onSelectCategory).toHaveBeenCalledWith(
      categories[1]
    );
    // expect(wrapper.find(".category-item").at(1).hasClass("active")).toEqual(
    //   true
    // );
    // expect(wrapper.find(".category-item").at(0).hasClass("active")).toEqual(
    //   false
    // );
    // expect(wrapper.props().selectedCategory.id).toEqual(categories[1].id);
  });
});

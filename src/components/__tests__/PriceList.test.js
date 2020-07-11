import React from "react";
import { shallow } from "enzyme";
import Ionicon from "react-ionicons";
import { Link } from "@reach/router";

import PriceList from "../PriceList";
import { flattenData } from "../../utility";
import { testCategories, testItems } from "../../testData";

const categories = flattenData(testCategories);
const itemsWithCategory = testItems.map((item) => {
  item.category = categories[item.cid];
  return item;
});

const props = {
  items: itemsWithCategory,
  onDeleteItem: jest.fn(),
};

let wrapper;
describe("test <PriceList />", () => {
  // this will be called before every test case(it)
  beforeEach(() => {
    wrapper = shallow(<PriceList {...props} />);
  });

  it("should render component to match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render price items to correct length", () => {
    expect(wrapper.find(".list-group-item").length).toEqual(props.items.length);
  });

  it("should render correct icon and content of price items", () => {
    const iconList = wrapper.find(".list-group-item").first().find(Ionicon);
    // number of icons for each price item
    expect(iconList.length).toEqual(3);
    // category icon name
    expect(iconList.first().props().icon).toEqual(
      props.items[0].category.iconName
    );
  });

  it("should trigger the correct callback", () => {
    const firstItem = wrapper.find(".list-group-item").first();
    // trigger modify event on first price item
    firstItem.find(Link).simulate("click");
    // expect(props.onModifyItem).toHaveBeenCalledWith(props.items[0]);
    // trigger delete event on first price item
    firstItem.find("a").first().simulate("click");
    expect(props.onDeleteItem).toHaveBeenCalledWith(props.items[0]);
  });
});

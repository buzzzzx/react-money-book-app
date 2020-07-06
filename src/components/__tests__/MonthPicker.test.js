import React from "react";
import { mount } from "enzyme";
import { findDOMNode } from "react-dom";

import { padLeft } from "../../utility";
import MonthPicker from "../MonthPicker";

const props = {
  year: 2020,
  month: 6,
  onChange: jest.fn(),
};

let wrapper;

describe("test <MonthPicker />", () => {
  beforeEach(() => {
    wrapper = mount(<MonthPicker {...props} />);
  });

  it("should render the component to match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the correct result by default props", () => {
    const dateText = wrapper.find(".dropdown-toggle").text();
    expect(dateText).toEqual("2020 年 06 月");

    expect(wrapper.find(".dropdown-menu").length).toEqual(0);
    expect(wrapper.state("isOpen")).toEqual(false);
  });

  it("after click dropdown button, should render year&month lists", () => {
    wrapper.find(".dropdown-toggle").simulate("click");
    expect(wrapper.find(".dropdown-menu").length).toEqual(1);
    expect(wrapper.state("isOpen")).toEqual(true);

    // check active year&month
    expect(wrapper.find(".years-range .dropdown-item.active").text()).toEqual(
      `${props.year} 年`
    );
    expect(wrapper.find(".months-range .dropdown-item.active").text()).toEqual(
      `${padLeft(props.month)} 月`
    );

    // check the length of year&month lists
    expect(wrapper.find(".years-range .dropdown-item").length).toEqual(9);
    expect(wrapper.find(".months-range .dropdown-item").length).toEqual(12);

    // check first year should be current year minus 4, and first month should be 01
    expect(wrapper.find(".years-range .dropdown-item").first().text()).toEqual(
      `${props.year - 4} 年`
    );
    expect(wrapper.find(".months-range .dropdown-item").first().text()).toEqual(
      "01 月"
    );
  });

  it("after click year&month item, should trigger the right status change", () => {
    wrapper.find(".dropdown-toggle").simulate("click");

    wrapper.find(".years-range .dropdown-item").first().simulate("click");
    expect(wrapper.state("selectedYear")).toEqual(props.year - 4);
    expect(
      wrapper.find(".years-range .dropdown-item").first().hasClass("active")
    ).toEqual(true);

    const firstMonthItem = wrapper.find(".months-range .dropdown-item").first();
    firstMonthItem.simulate("click");
    expect(wrapper.state("selectedMonth")).toEqual(1);
    expect(wrapper.state("isOpen")).toEqual(false);
    expect(props.onChange).toHaveBeenCalledWith(props.year - 4, 1);
  });

  it("when dropdown is showing, click the outside, dropdown should be closed", () => {
    const eventMap = {};
    // jest.fn() will return a new. unused function
    // jest.fn(implementation), implementation is a mock implementation of left hand side
    document.addEventListener = jest.fn((event, cb) => {
      eventMap[event] = cb;
    });

    // mock componentDidMout: immediately add event listener after component mount
    const wrapper = mount(<MonthPicker {...props} />);

    wrapper.find(".dropdown-toggle").simulate("click");
    eventMap.click({
      target: findDOMNode(wrapper.instance()),
    });
    expect(wrapper.state("isOpen")).toEqual(true);

    eventMap.click({
      target: document,
    });
    expect(wrapper.state("isOpen")).toEqual(false);
  });
});

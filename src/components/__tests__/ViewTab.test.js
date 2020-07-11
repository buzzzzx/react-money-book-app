import React from "react";
import { mount } from "enzyme";

import ViewTab from "../ViewTab";

const props = {
  activeIndex: 0,
  onTabChange: jest.fn(),
};

let wrapper;
describe("test <ViewTab />", () => {
  beforeEach(() => {
    wrapper = mount(<ViewTab {...props} />);
  });

  it("should render component to match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render view tabs to correct length", () => {
    expect(wrapper.find(".nav-item").length).toEqual(2);
  });

  it("should trigger the correct callback", () => {
    const fakeEvent = { preventDefault: () => console.log("preventDefault") };
    const listViewTab = wrapper.find(".nav-item").first();
    const chartViewTab = wrapper.find(".nav-item").last();

    chartViewTab.find("a").simulate("click", fakeEvent);
    expect(props.onTabChange).toHaveBeenCalledWith(1);
    listViewTab.find("a").simulate("click", fakeEvent);
    expect(props.onTabChange).toHaveBeenCalledWith(0);
  });
});

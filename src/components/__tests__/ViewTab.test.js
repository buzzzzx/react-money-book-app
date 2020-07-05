import React from "react";
import { shallow } from "enzyme";

import ViewTab from "../ViewTab";
import { LIST_VIEW, CHART_VIEW } from "../../utility";

const props = {
  activeTab: LIST_VIEW,
  onTabChange: jest.fn(),
};

let wrapper;
describe("test <ViewTab />", () => {
  beforeEach(() => {
    wrapper = shallow(<ViewTab {...props} />);
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
    expect(props.onTabChange).toHaveBeenCalledWith(CHART_VIEW);
    listViewTab.find("a").simulate("click", fakeEvent);
    expect(props.onTabChange).toHaveBeenCalledWith(LIST_VIEW);
  });
});

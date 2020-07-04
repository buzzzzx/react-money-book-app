import React from "react";
import { shallow } from "enzyme";

import TotalPrice from "../TotalPrice";

const props = {
  totalIncome: 20000,
  totalOutcome: 4000,
};

describe("test <TotalPrice />", () => {
  it("component should render correct income&outcome number", () => {
    const wrapper = shallow(<TotalPrice {...props} />);
    expect(wrapper.find(".income").text() * 1).toEqual(20000);
    expect(wrapper.find(".outcome").text() * 1).toEqual(4000);
  });
});

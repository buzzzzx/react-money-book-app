import React from "react";
import { shallow } from "enzyme";

import CreateBtn from "../CreateBtn";

const props = {
  onClick: jest.fn(),
};

describe("test <CreateBtn />", () => {
  it("should trigger the correct callback", () => {
    const wrapper = shallow(<CreateBtn {...props} />);
    wrapper.find("button").simulate("click");
    expect(props.onClick).toHaveBeenCalled();
  });
});

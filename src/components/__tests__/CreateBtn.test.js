import React from "react";
import { shallow } from "enzyme";

import CreateBtn from "../CreateBtn";

// const props = {
//   onClick: jest.fn(),
// };

describe("test <CreateBtn />", () => {
  it("should render the component to match the snapshot", () => {
    const wrapper = shallow(<CreateBtn />);
    expect(wrapper).toMatchSnapshot();
  });

  // it("should trigger the correct callback", () => {
  //   const wrapper = shallow(<CreateBtn {...props} />);
  //   wrapper.find("button").simulate("click");
  //   expect(props.onClick).toHaveBeenCalled();
  // });
});

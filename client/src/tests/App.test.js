import React from "react";
import { shallow } from "enzyme";
import App from "../App";

test("should render the Menu", () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toMatchSnapshot();
});

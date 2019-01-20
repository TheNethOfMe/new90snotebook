import React from "react";
import { shallow } from "enzyme";
import Footer from "../../../components/layout/Footer";

test("should render the Not Found Page", () => {
  const wrapper = shallow(<Footer />);
  expect(wrapper).toMatchSnapshot();
});

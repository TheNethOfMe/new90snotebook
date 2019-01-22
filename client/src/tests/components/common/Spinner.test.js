import React from "react";
import { shallow } from "enzyme";
import Spinner from "../../../components/common/Spinner";

let wrapper;

test("should render the Spinner", () => {
  wrapper = shallow(<Spinner />);
  expect(wrapper).toMatchSnapshot();
});

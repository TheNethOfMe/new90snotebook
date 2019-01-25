import React from "react";
import { shallow } from "enzyme";
import DropDownGroup from "../../../components/common/DropDownGroup";

let wrapper, onChange, error, info;

beforeEach(() => {
  onChange = jest.fn();
  wrapper = shallow(
    <DropDownGroup
      name="email"
      label="Email"
      error={error}
      onChange={onChange}
      info={info}
      options={[
        {
          val: "one",
          display: "Option One"
        },
        {
          val: "two",
          display: "Option Two"
        }
      ]}
    />
  );
});

test("should render the select drop-down", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should fire onChange when option is selected", () => {
  wrapper
    .find("select")
    .at(0)
    .simulate("change", "two");
  expect(onChange).toHaveBeenCalledWith("two");
});

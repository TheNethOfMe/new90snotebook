import React from "react";
import { shallow } from "enzyme";
import TextFieldGroup from "../../../components/common/TextFieldGroup";

let wrapper, onChange, error, info;

beforeEach(() => {
  onChange = jest.fn();
  wrapper = shallow(
    <TextFieldGroup
      name="email"
      placeholder="email"
      value=""
      label="Email"
      error={error}
      onChange={onChange}
      info={info}
    />
  );
});

test("should render the text field", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should fire onChange when text is entered", () => {
  wrapper
    .find("input")
    .at(0)
    .simulate("change", "Typing");
  expect(onChange).toHaveBeenCalledWith("Typing");
});

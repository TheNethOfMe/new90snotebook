import React from "react";
import { shallow } from "enzyme";
import { Login } from "../../../components/auth/Login";
import { fakeExistingUser } from "../../dummyData";

let wrapper, loginUser, auth, errors;

beforeEach(() => {
  loginUser = jest.fn();
  auth = { user: "test", isAuthenticated: false };
  errors = {};
  wrapper = shallow(
    <Login loginUser={loginUser} auth={auth} errors={errors} />
  );
});

test("should render the Login page", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should write text to inputs", () => {
  const testVal = "TestingValue";
  expect(wrapper.state().email).toBeFalsy();
  expect(wrapper.state().password).toBeFalsy();
  wrapper
    .find("TextFieldGroup")
    .at(0)
    .simulate("change", { target: { name: "email", value: testVal } });
  expect(wrapper.state().email).toEqual(testVal);
  wrapper
    .find("TextFieldGroup")
    .at(1)
    .simulate("change", { target: { name: "password", value: testVal } });
  expect(wrapper.state().password).toEqual(testVal);
});

test("should call loginUser on form submit", () => {
  wrapper.setState(fakeExistingUser);
  wrapper.find("form").simulate("submit", { preventDefault: () => jest.fn() });
  expect(loginUser).toHaveBeenCalledWith(fakeExistingUser);
});

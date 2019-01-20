import React from "react";
import { shallow } from "enzyme";
import { Register } from "../../../components/auth/Register";
import { fakeNewUser } from "../../dummyData";

let wrapper, registerUser, auth, errors, history;

beforeEach(() => {
  registerUser = jest.fn();
  auth = { user: "test", isAuthenticated: false };
  errors = {};
  history = {};
  wrapper = shallow(
    <Register
      registerUser={registerUser}
      auth={auth}
      errors={errors}
      history={history}
    />
  );
});

test("should render the Register page", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should write text to inputs", () => {
  const testVal = "TestingValue";
  expect(wrapper.state().email).toBeFalsy();
  expect(wrapper.state().password).toBeFalsy();
  expect(wrapper.state().password2).toBeFalsy();
  wrapper
    .find("input")
    .at(0)
    .simulate("change", { target: { name: "email", value: testVal } });
  expect(wrapper.state().email).toEqual(testVal);
  wrapper
    .find("input")
    .at(1)
    .simulate("change", { target: { name: "password", value: testVal } });
  expect(wrapper.state().password).toEqual(testVal);
  wrapper
    .find("input")
    .at(2)
    .simulate("change", { target: { name: "password2", value: testVal } });
  expect(wrapper.state().password2).toEqual(testVal);
});

test("should call loginUser on form submit", () => {
  wrapper.setState(fakeNewUser);
  wrapper.find("form").simulate("submit", { preventDefault: () => jest.fn() });
  expect(registerUser).toHaveBeenCalledWith(fakeNewUser, history);
});

import React from "react";
import { shallow } from "enzyme";
import { Navbar } from "../../../components/layout/Navbar";

let wrapper, logoutUser, clearCurrentProfile, auth;

beforeEach(() => {
  logoutUser = jest.fn();
  clearCurrentProfile = jest.fn();
});

test("should render the Navbar component", () => {
  auth = { user: {}, isAuthenticated: false };
  wrapper = shallow(
    <Navbar
      clearCurrentProfile={clearCurrentProfile}
      logoutUser={logoutUser}
      auth={auth}
      theme="test-theme"
    />
  );
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find("li").length).toEqual(3);
});

test("should render component when a user is logged in", () => {
  auth = { user: {}, isAuthenticated: true };
  wrapper = shallow(
    <Navbar
      clearCurrentProfile={clearCurrentProfile}
      logoutUser={logoutUser}
      auth={auth}
      theme="test-theme"
    />
  );
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find("li").length).toEqual(4);
});

test("should logout user on logout click", () => {
  auth = { user: {}, isAuthenticated: true };
  wrapper = shallow(
    <Navbar
      clearCurrentProfile={clearCurrentProfile}
      logoutUser={logoutUser}
      auth={auth}
      theme="test-theme"
    />
  );
  wrapper
    .find(".header__nav-item")
    .at(3)
    .simulate("click", { preventDefault: () => {} });
  expect(clearCurrentProfile).toHaveBeenCalled();
  expect(logoutUser).toHaveBeenCalled();
});

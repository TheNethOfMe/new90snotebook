import React from "react";
import { shallow } from "enzyme";
import { Navbar } from "../../../components/layout/Navbar";

let wrapper, logoutUser, auth;

beforeEach(() => {
  logoutUser = jest.fn();
});

test("should render the Navbar component", () => {
  auth = { user: {}, isAuthenticated: false };
  wrapper = shallow(<Navbar logoutUser={logoutUser} auth={auth} />);
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find("li").length).toEqual(2);
});

test("should render component when a user is logged in", () => {
  auth = { user: {}, isAuthenticated: true };
  wrapper = shallow(<Navbar logoutUser={logoutUser} auth={auth} />);
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find("li").length).toEqual(3);
});

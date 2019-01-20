import React from "react";
import { shallow } from "enzyme";
import { Landing } from "../../../components/layout/Landing";

let wrapper, auth, history;

beforeEach(() => {
  history = { push: jest.fn() };
});

test("should render the Login page", () => {
  auth = { user: "test", isAuthenticated: false };
  wrapper = shallow(<Landing auth={auth} history={history} />);
  expect(wrapper).toMatchSnapshot();
});

test("should redirect if user is logged in", () => {
  auth = { user: "test", isAuthenticated: true };
  wrapper = shallow(<Landing auth={auth} history={history} />);
  expect(history.push).toHaveBeenCalledWith("/dashboard");
});

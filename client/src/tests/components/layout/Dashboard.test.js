import React from "react";
import { shallow } from "enzyme";
import { Dashboard } from "../../../components/layout/Dashboard";

let wrapper, getCurrentProfile;

beforeEach(() => {
  getCurrentProfile = jest.fn();
  wrapper = shallow(<Dashboard getCurrentProfile={getCurrentProfile} />);
});

test("should render Dashboard component", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should call getCurrentProfile when component mounts", () => {
  expect(getCurrentProfile).toHaveBeenCalled();
});
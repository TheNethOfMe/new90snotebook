import React from "react";
import { shallow } from "enzyme";
import { Dashboard } from "../../../components/dashboard/Dashboard";

let wrapper, getCurrentProfile;

beforeEach(() => {
  getCurrentProfile = jest.fn();
  wrapper = shallow(
    <Dashboard getCurrentProfile={getCurrentProfile} auth={{}} profile={{}} />
  );
});

test("should render Dashboard component", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should call getCurrentProfile when component mounts", () => {
  expect(getCurrentProfile).toHaveBeenCalled();
});

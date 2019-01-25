import React from "react";
import { shallow } from "enzyme";
import { FirstTime } from "../../../components/dashboard/FirstTime";
import { fakeUserProfile } from "../../dummyData";

let wrapper, errors, createNewProfile;

beforeEach(() => {
  errors = {};
  createNewProfile = jest.fn();
  wrapper = shallow(
    <FirstTime errors={errors} createNewProfile={createNewProfile} />
  );
});

test("should render FirstTime component", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should call createNewProfile", () => {
  wrapper.instance().createProfile(fakeUserProfile);
  expect(createNewProfile).toHaveBeenCalledWith(fakeUserProfile);
});

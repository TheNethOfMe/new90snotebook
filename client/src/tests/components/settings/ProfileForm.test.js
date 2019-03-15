import React from "react";
import { shallow } from "enzyme";
import ProfileForm from "../../../components/settings/ProfileForm";
import { fakeUserProfile } from "../../dummyData";

let wrapper, handleSubmit, errors;

beforeEach(() => {
  handleSubmit = jest.fn();
  errors = {};
});

test("should render the profile form", () => {
  wrapper = shallow(
    <ProfileForm handleSubmit={handleSubmit} profile={null} errors={errors} />
  );
  expect(wrapper).toMatchSnapshot();
});

test("should render profile form with values in fields if a profile is passed in", () => {
  wrapper = shallow(
    <ProfileForm
      handleSubmit={handleSubmit}
      profile={fakeUserProfile}
      errors={errors}
    />
  );
  const checkFirstName = wrapper
    .find("TextFieldGroup")
    .at(0)
    .props().value;
  const checkLastName = wrapper
    .find("TextFieldGroup")
    .at(1)
    .props().value;
  expect(checkFirstName).toEqual("Sparky");
  expect(checkLastName).toEqual("McSparkerton");
});

import React from "react";
import { shallow } from "enzyme";
import { Notifications } from "../../../components/dashboard/Notifications";
import { fakeNotification } from "../../dummyData";

let wrapper, getAllNotifications;

beforeEach(() => {
  getAllNotifications = jest.fn();
});

test("should render component and call getAllNotifications", () => {
  const notifications = {
    notifications: [fakeNotification],
    loading: false
  };
  wrapper = shallow(
    <Notifications
      notifications={notifications}
      getAllNotifications={getAllNotifications}
    />
  );
  expect(wrapper).toMatchSnapshot();
  expect(getAllNotifications).toHaveBeenCalled();
});

test("should render component with notifications", () => {
  const notifications = {
    notifications: [fakeNotification],
    loading: false
  };
  wrapper = shallow(
    <Notifications
      notifications={notifications}
      getAllNotifications={getAllNotifications}
    />
  );
  expect(
    wrapper
      .find("p")
      .at(0)
      .text()
  ).toEqual(fakeNotification.message);
});

test("should render component without notifications", () => {
  const notifications = {
    notifications: [],
    loading: false
  };
  wrapper = shallow(
    <Notifications
      notifications={notifications}
      getAllNotifications={getAllNotifications}
    />
  );
  expect(
    wrapper
      .find("p")
      .at(0)
      .text()
  ).toEqual("There are no notifications to display");
});

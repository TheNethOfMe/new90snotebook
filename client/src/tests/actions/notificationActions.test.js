import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import mockAxios from "jest-mock-axios";

import * as notificationActions from "../../actions/notificationActions";
import { fakeNotification } from "../dummyData";

const createMockStore = configureMockStore([thunk]);

afterEach(() => {
  mockAxios.reset();
});

test("should set notification loading", () => {
  const store = createMockStore({
    notifications: { notifications: null, loading: false }
  });
  store.dispatch(notificationActions.setNotificationsLoading());
  expect(store.getActions()[0]).toEqual({ type: "NOTIFICATIONS_LOADING" });
});

test("should get notifications", () => {
  const store = createMockStore({
    notifications: { notifications: null, loading: false }
  });
  store.dispatch(notificationActions.getAllNotifications());
  expect(mockAxios.get).toHaveBeenLastCalledWith("/api/notification");
  mockAxios.mockResponse({ data: fakeNotification });
  expect(store.getActions()[0]).toEqual({
    type: "GET_NOTIFICATIONS",
    payload: fakeNotification
  });
});

test("should setup delete action for notifications", () => {
  const store = createMockStore({
    notifications: { notifications: [fakeNotification], loading: false }
  });
  store.dispatch(notificationActions.deleteNotification(fakeNotification.id));
  expect(mockAxios.delete).toHaveBeenLastCalledWith("/api/notification/56");
});

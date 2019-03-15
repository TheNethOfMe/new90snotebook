import notificationReducer from "../../reducers/notificationReducer";
import * as types from "../../actions/types";
import { fakeNotification } from "../dummyData";

test("should setup default auth values", () => {
  const state = notificationReducer(undefined, { type: "@@INIT" });
  const expectedResult = {
    notifications: null,
    loading: false
  };
  expect(state).toEqual(expectedResult);
});

test("should set notifications loading", () => {
  const state = notificationReducer(undefined, {
    type: types.NOTIFICATIONS_LOADING
  });
  const expectedResult = {
    notifications: null,
    loading: true
  };
  expect(state).toEqual(expectedResult);
});

test("should get profile", () => {
  const state = notificationReducer(
    { notifications: null, loading: true },
    { type: types.GET_NOTIFICATIONS, payload: [fakeNotification] }
  );
  const expectedResult = {
    notifications: [fakeNotification],
    loading: false
  };
  expect(state).toEqual(expectedResult);
});

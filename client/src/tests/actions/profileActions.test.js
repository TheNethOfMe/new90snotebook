import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import mockAxios from "jest-mock-axios";

import * as profileActions from "../../actions/profileActions";
import { fakeUserProfile } from "../dummyData";

jest.mock("../../utils/setAuthToken");

const createMockStore = configureMockStore([thunk]);

afterEach(() => {
  mockAxios.reset();
});

test("should get profile for logged in user", () => {
  const store = createMockStore({ profile: { profile: null, loading: false } });
  store.dispatch(profileActions.getCurrentProfile());
  expect(mockAxios.get).toHaveBeenLastCalledWith("/api/profile");
  mockAxios.mockResponse({ data: fakeUserProfile });
  expect(store.getActions()[0]).toEqual({
    type: "GET_PROFILE",
    payload: fakeUserProfile
  });
});

test("should make profile an empty object if no profile is found", () => {
  const store = createMockStore({ profile: { profile: null, loading: false } });
  store.dispatch(profileActions.getCurrentProfile());
  mockAxios.mockError({ response: { data: "no profile found" } });
  expect(store.getActions()[0]).toEqual({
    type: "GET_PROFILE",
    payload: {}
  });
});

test("should set profile loading", () => {
  const store = createMockStore({ profile: { profile: null, loading: false } });
  store.dispatch(profileActions.setProfileLoading());
  expect(store.getActions()[0]).toEqual({ type: "PROFILE_LOADING" });
});

test("should clear current profile", () => {
  const store = createMockStore({
    profile: { profile: fakeUserProfile, loading: false }
  });
  store.dispatch(profileActions.clearCurrentProfile());
  expect(store.getActions()[0]).toEqual({ type: "CLEAR_CURRENT_PROFILE" });
});

import profileReducer from "../../reducers/profileReducer";
import * as types from "../../actions/types";
import { fakeUserProfile } from "../dummyData";

test("should setup default auth values", () => {
  const state = profileReducer(undefined, { type: "@@INIT" });
  const expectedResult = {
    profile: null,
    profiles: null,
    loading: false
  };
  expect(state).toEqual(expectedResult);
});

test("should set profile loading", () => {
  const state = profileReducer(undefined, { type: types.PROFILE_LOADING });
  const expectedResult = {
    profile: null,
    profiles: null,
    loading: true
  };
  expect(state).toEqual(expectedResult);
});

test("should get profile", () => {
  const state = profileReducer(
    { profile: null, profiles: null, loading: true },
    { type: types.GET_PROFILE, payload: fakeUserProfile }
  );
  const expectedResult = {
    profile: fakeUserProfile,
    profiles: null,
    loading: false
  };
  expect(state).toEqual(expectedResult);
});

test("should clear current profile", () => {
  const state = profileReducer(
    { profile: fakeUserProfile, profiles: null, loading: false },
    { type: types.CLEAR_CURRENT_PROFILE }
  );
  const expectedResult = {
    profile: null,
    profiles: null,
    loading: false
  };
  expect(state).toEqual(expectedResult);
});

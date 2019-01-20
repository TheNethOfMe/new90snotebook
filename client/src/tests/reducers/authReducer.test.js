import authReducer from "../../reducers/authReducer";
import { SET_CURRENT_USER } from "../../actions/types";

test("should setup default auth values", () => {
  const state = authReducer(undefined, { type: "@@INIT" });
  const expectedResult = {
    isAuthenticated: false,
    user: {}
  };
  expect(state).toEqual(expectedResult);
});

test("should set user in state", () => {
  const uid = "123456";
  const state = authReducer(undefined, {
    type: SET_CURRENT_USER,
    payload: uid
  });
  const expectedResult = {
    isAuthenticated: true,
    user: uid
  };
  expect(state).toEqual(expectedResult);
});

test("should remove user from state", () => {
  const uid = "123456";
  const testState = {
    isAuthenticated: true,
    user: uid
  };
  const state = authReducer(testState, { type: SET_CURRENT_USER, payload: {} });
  const expectedResult = {
    isAuthenticated: false,
    user: {}
  };
  expect(state).toEqual(expectedResult);
});

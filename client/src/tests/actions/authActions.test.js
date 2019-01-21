import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import mockAxios from "jest-mock-axios";

import {
  setCurrentUser,
  registerUser,
  loginUser,
  logoutUser
} from "../../actions/authActions";
import { fakeNewUser, fakeExistingUser } from "../dummyData";

import { SET_CURRENT_USER } from "../../actions/types";

jest.mock("../../utils/setAuthToken");
jest.mock("jwt-decode");

const createMockStore = configureMockStore([thunk]);

afterEach(() => {
  mockAxios.reset();
});

test("should setup register user object", () => {
  const userData = fakeExistingUser;
  const action = setCurrentUser(userData);
  expect(action).toEqual({ type: SET_CURRENT_USER, payload: userData });
});

test("should register a user", () => {
  let history = { push: jest.fn() };
  const store = createMockStore({ auth: {} });
  store.dispatch(registerUser(fakeNewUser, history));

  expect(mockAxios.post).toHaveBeenLastCalledWith(
    "/api/users/register",
    fakeNewUser
  );

  mockAxios.mockResponse("Response");
  expect(history.push).toHaveBeenCalledWith("/login");
});

test("should fail to register", () => {
  let history = { push: jest.fn() };
  const store = createMockStore({ auth: {} });
  const fakeError = "No way, Jose!";
  store.dispatch(registerUser(fakeNewUser, history));
  mockAxios.mockError({ response: { data: fakeError } });

  expect(store.getActions()[0]).toEqual({
    type: "GET_ERRORS",
    payload: fakeError
  });
});

test("should log in user", () => {
  const store = createMockStore({ auth: {} });
  store.dispatch(loginUser(fakeExistingUser));
  expect(mockAxios.post).toHaveBeenLastCalledWith(
    "/api/users/login",
    fakeExistingUser
  );
  mockAxios.mockResponse({ data: { token: "Hello" } });
  expect(store.getActions()[0].type).toEqual("SET_CURRENT_USER");
});

test("should log out user", () => {
  const store = createMockStore({ auth: {} });
  store.dispatch(logoutUser());
  expect(store.getActions()[0]).toEqual({
    type: "SET_CURRENT_USER",
    payload: {}
  });
});

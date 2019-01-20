import errorReducer from "../../reducers/errorReducer";
import { GET_ERRORS } from "../../actions/types";

test("should setup default error values", () => {
  const state = errorReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual({});
});

test("should set error state", () => {
  const testAction = {
    type: GET_ERRORS,
    payload: {
      errorMSG: "You did a bad"
    }
  };
  const state = errorReducer(undefined, testAction);
  expect(state).toEqual(testAction.payload);
});

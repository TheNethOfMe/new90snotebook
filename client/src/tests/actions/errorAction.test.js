import setErrors from "../../actions/errorAction";
import { fakeError } from "../dummyData";

import { GET_ERRORS } from "../../actions/types";

test("should setup register user object", () => {
  const errorData = fakeError;
  const action = setErrors(errorData);
  expect(action).toEqual({
    type: GET_ERRORS,
    payload: errorData.response.data
  });
});

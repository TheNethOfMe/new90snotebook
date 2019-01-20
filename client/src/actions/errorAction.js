import { GET_ERRORS } from "./types";

const setErrors = err => ({
  type: GET_ERRORS,
  payload: err.response.data
});

export default setErrors;

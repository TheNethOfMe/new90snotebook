const Validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validateProfileInput(data) {
  let errors = {};
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "A first name is required.";
  }

  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "A last name is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

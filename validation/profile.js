const Validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validateProfileInput(data) {
  let errors = {};
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "Sorry, we need at least a first name for this to work.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

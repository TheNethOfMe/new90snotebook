const Validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validateProfileInput(data) {
  let errors = {};
  data.screenName = !isEmpty(data.screenName) ? data.screenName : "";

  if (!Validator.isLength(data.screenName, { min: 5, max: 30 })) {
    errors.screenName = "Screen name must be between 5 and 30 characters.";
  }

  if (Validator.isEmpty(data.screenName)) {
    errors.screenName = "A screen name is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

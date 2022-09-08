const validator = require("validator");
const isEmpty = require("../config/isEmpty");

module.exports = function resetEmailValidation(data) {
  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";

  if (!validator.isEmail(data.email)) {
    errors.email = "Insert valid email";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "email field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

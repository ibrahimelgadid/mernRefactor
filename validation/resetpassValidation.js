const validator = require("validator");
const isEmpty = require("../config/isEmpty");

module.exports = function resetpassValidation(data) {
  let errors = {};

  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!validator.isLength(data.password, { min: 4, max: 20 })) {
    errors.password = "password value must be between 2 and 20 charchter";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "password field is required";
  }

  if (!validator.equals(data.password2, data.password)) {
    errors.password2 = "Confirm password doesn't match";
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = "re-enter password";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

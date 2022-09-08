const validator = require("validator");
const isEmpty = require("../config/isEmpty");

const registerValidation = (data) => {
  let errors = {};
  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // username validation
  if (!validator.isLength(data.username, { min: 2 })) {
    errors.username = "Username most be more than 2 chars";
  }
  if (validator.isEmpty(data.username)) {
    errors.username = "Username is required";
  }

  // email validation
  if (!validator.isEmail(data.email)) {
    errors.email = "Enter valid email";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  if (!data.googleId) {
    // password validation
    if (!validator.isLength(data.password, { min: 4, max: 20 })) {
      errors.password = "Password value must be between 4 and 20 charchter";
    }
    if (validator.isEmpty(data.password)) {
      errors.password = "Password is required";
    }

    // password2 validation

    if (!validator.equals(data.password2, data.password)) {
      errors.password2 = "Password doesn't match";
    }
  }

  return {
    isValid: isEmpty(errors),
    errors,
  };
};

module.exports = registerValidation;

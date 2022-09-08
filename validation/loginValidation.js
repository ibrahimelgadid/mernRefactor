const validator = require("validator");
const isEmpty = require("../config/isEmpty");

const loginValidation = (data) => {
  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // email validation
  if (!validator.isEmail(data.email)) {
    errors.email = "enter valid email";
  }

  if (!data.googleId) {
    if (validator.isEmpty(data.email)) {
      errors.email = "email is required";
    }

    // password validation
    if (validator.isEmpty(data.password)) {
      errors.password = "Password is required";
    }
  }

  return {
    isValid: isEmpty(errors),
    errors,
  };
};

module.exports = loginValidation;

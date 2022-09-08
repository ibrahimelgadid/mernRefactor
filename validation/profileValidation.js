const validator = require("validator");
const isEmpty = require("../config/isEmpty");

module.exports = function profileValidation(data) {
  const errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";

  if (!validator.isLength(data.username, { min: 2, max: 40 })) {
    errors.username = "Username needs to between 2 and 4 characters";
  }

  if (validator.isEmpty(data.username)) {
    errors.username = "Username is required";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Not valid email";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!isEmpty(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid URL";
    }
  }

  if (!isEmpty(data.github)) {
    if (!validator.isURL(data.github)) {
      errors.github = "Not a valid URL";
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }

  if (!isEmpty(data.phone)) {
    if (!validator.isLength(data.phone, { min: 11, max: 40 })) {
      errors.phone = "Phone must between 11 and 40 characters";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

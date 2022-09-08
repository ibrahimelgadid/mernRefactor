const validator = require("validator");
const isEmpty = require("../config/isEmpty");

const commentValidation = (data) => {
  let errors = {};

  data.comment = !isEmpty(data.comment) ? data.comment : "";

  if (validator.isEmpty(data.comment)) {
    errors.comment = "Comment field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = commentValidation;
